// Sniffer Agent — Ingest Cycle Orchestrator
// Runs on Cloudflare Worker Cron (every 1 min via wrangler.toml).
// Pulls only sources that are due (rankSources), fingerprints events,
// skips seen events, runs the pipeline, synthesizes clusters with Gemini,
// generates safety warnings (weather) and ghost cards (DONKI).
//
// Injectable clients + KV mock for testing — no real network calls in tests.

const { rankSources } = require('../lib/source-ranker');
const { isNewEvent, markEventSeen } = require('../lib/event-fingerprint');
const { deduplicateWires } = require('../lib/wire-deduplicator');
const { identifyClusters } = require('../lib/cluster-identifier');
const { filterByImpact } = require('../lib/impact-filter');
const { synthesizeSources } = require('../lib/extractive-synthesis');
const { injectSafetyWarning } = require('../lib/safety-sentinel');
const { generateGhostCards } = require('../lib/probability-cones');
const { mapKpIndex, mapSolarWind, mapDonkiEvent } = require('../lib/space-weather-mapper');
const { mapGdeltArticle } = require('../lib/news-mapper');
const { mapWeatherEvent } = require('../lib/weather-mapper');
const { callGemini } = require('../lib/gemini-client');
const { mapGeminiResponse } = require('../lib/gemini-mapper');
const { DEFAULT_LOCATIONS } = require('../lib/open-meteo-client');

// KV keys
const KV_EVENTS_LATEST = 'events:latest';
const KV_SOURCE_META = id => `source:meta:${id}`;
const MAX_EVENTS_IN_KV = 500;
const DEFAULT_MIN_IMPACT = 5;

const ALL_SOURCES = ['noaa-swpc', 'gdelt', 'nasa-donki', 'open-meteo'];

/**
 * Default client factory — returns real API clients when running in production.
 * Tests inject mocks via the `clients` param of runIngestCycle().
 */
function defaultClients(env, now) {
  const { fetchNoaaSwpc } = require('../lib/noaa-swpc-client');
  const { fetchGdelt } = require('../lib/gdelt-client');
  const { fetchOpenMeteo } = require('../lib/open-meteo-client');
  const { fetchNasaDonki } = require('../lib/nasa-donki-client');

  return {
    'noaa-swpc':  () => fetchNoaaSwpc(),
    'gdelt':      () => fetchGdelt(),
    'open-meteo': () => fetchOpenMeteo(),
    'nasa-donki': () => fetchNasaDonki(env.NASA_API_KEY || 'DEMO_KEY', globalThis.fetch, now),
  };
}

/**
 * Read per-source metadata from KV (lastFetchedAt, consecutiveEmptyPolls).
 */
async function getSourceMeta(kv) {
  return Promise.all(
    ALL_SOURCES.map(async id => {
      const raw = await kv.get(KV_SOURCE_META(id));
      const meta = raw ? JSON.parse(raw) : {};
      return {
        id,
        lastFetchedAt: meta.lastFetchedAt || 0,
        consecutiveEmptyPolls: meta.consecutiveEmptyPolls || 0,
      };
    })
  );
}

/**
 * Persist updated source metadata to KV.
 */
async function updateSourceMeta(kv, id, newItemCount, now) {
  const raw = await kv.get(KV_SOURCE_META(id));
  const prev = raw ? JSON.parse(raw) : {};
  const consecutiveEmptyPolls = newItemCount === 0
    ? (prev.consecutiveEmptyPolls || 0) + 1
    : 0;

  await kv.put(
    KV_SOURCE_META(id),
    JSON.stringify({ lastFetchedAt: now, consecutiveEmptyPolls }),
    { expirationTtl: 7 * 86_400 }
  );
}

/**
 * Map NASA DONKI events → forecast objects accepted by generateGhostCards.
 * Marks all DONKI detections as confirmed (speculative: false).
 */
function donkiToForecasts(donkiEvents) {
  return donkiEvents
    .filter(e => e && e.id && e.eventType)
    .map(e => ({
      patternMatchId: `donki-${e.eventType}-${e.id}`,
      eventType: e.eventType,
      location: 'Earth-proximate',
      speculative: false,
    }));
}

/**
 * Ingest cycle — the core sniffer loop.
 *
 * @param {{ CACHE: { get, put }, NASA_API_KEY?: string, GEMINI_API_KEY?: string }} env - Cloudflare Worker env bindings
 * @param {Object|null} [clients] - injectable client map for testing
 * @param {Function|null} [synthesizer] - injectable async synthesizer (text) => Promise<string|null>
 * @returns {Promise<{
 *   polled: string[],
 *   newEvents: number,
 *   clusters: number,
 *   synthesis: Object,
 *   safetyWarnings: string[],
 *   ghostCards: Array
 * }>}
 */
async function runIngestCycle(env, clients = null, synthesizer = null, now = Date.now()) {
  const kv = env.CACHE;
  const resolvedClients = clients || defaultClients(env, now);
  const resolvedSynthesizer = synthesizer || (async (text) => {
    if (!env.GEMINI_API_KEY) return null;
    const raw = await callGemini(text, env.GEMINI_API_KEY);
    return mapGeminiResponse(raw);
  });

  // 1. Determine which sources are due for polling
  const sourcesMeta = await getSourceMeta(kv);
  const ranked = rankSources(sourcesMeta, now);

  if (ranked.length === 0) {
    return { polled: [], newEvents: 0, clusters: 0, synthesis: {}, safetyWarnings: [], ghostCards: [] };
  }

  // 2. Fetch due sources; save raw results per source for AI enrichment
  const freshEvents = [];
  const polled = [];
  const rawBySourceMapped = {};

  for (const { id } of ranked) {
    const fetch = resolvedClients[id];
    if (!fetch) continue;

    let rawData;
    let mappedItems = [];
    try {
      rawData = await fetch();

      // Perform mapping based on source ID
      if (id === 'noaa-swpc') {
        mappedItems = [
          mapKpIndex(rawData.kp),
          mapSolarWind(rawData.wind)
        ].filter(Boolean);
      } else if (id === 'gdelt') {
        mappedItems = (Array.isArray(rawData.articles) ? rawData.articles : []).map(mapGdeltArticle);
      } else if (id === 'nasa-donki') {
        mappedItems = [];
        for (const type in rawData) {
          mappedItems.push(...rawData[type].map(e => mapDonkiEvent(e, type)));
        }
      } else if (id === 'open-meteo') {
        mappedItems = rawData.map((r, i) => r ? mapWeatherEvent(r, DEFAULT_LOCATIONS[i]) : null).filter(Boolean);
      }

      rawBySourceMapped[id] = mappedItems;
    } catch (e) {
      // Source failure → skip; don't update lastFetchedAt so it retries next cycle
      continue;
    }

    let newCount = 0;
    for (const item of mappedItems) {
      if (await isNewEvent(kv, item)) {
        await markEventSeen(kv, item);
        freshEvents.push(item);
        newCount++;
      }
    }

    await updateSourceMeta(kv, id, newCount, now);
    polled.push(id);
  }

  // 3. Safety warnings from raw weather events (current conditions, not just "new" events)
  const weatherEvents = rawBySourceMapped['open-meteo'] || [];
  const safetyWarnings = weatherEvents
    .map(e => injectSafetyWarning(e))
    .filter(w => w && w.length > 0);

  // 4. Ghost cards from raw DONKI events (confirmed space weather detections)
  const donkiEvents = rawBySourceMapped['nasa-donki'] || [];
  const ghostCards = generateGhostCards(donkiToForecasts(donkiEvents));

  if (freshEvents.length === 0) {
    return { polled, newEvents: 0, clusters: 0, synthesis: {}, safetyWarnings, ghostCards };
  }

  // 5. Run fresh events through the pipeline
  const deduped = deduplicateWires(freshEvents);
  const filtered = filterByImpact(deduped, { minImpactScore: DEFAULT_MIN_IMPACT });
  const clustered = identifyClusters(filtered);

  // 6. Synthesize a brief per cluster (Gemini when available, truncation fallback)
  const eventsByTopic = {};
  for (const event of filtered) {
    if (!event.topic) continue;
    if (!eventsByTopic[event.topic]) eventsByTopic[event.topic] = [];
    eventsByTopic[event.topic].push(event);
  }

  const synthesis = {};
  for (const cluster of clustered) {
    const topicEvents = eventsByTopic[cluster.theme] || [];
    const sources = topicEvents.map(e => ({ content: e.text || e.note || e.content || '' }));
    synthesis[cluster.clusterId] = await synthesizeSources(sources, resolvedSynthesizer);
  }

  // 7. Merge with existing events, cap at MAX_EVENTS_IN_KV, write to KV
  const existingRaw = await kv.get(KV_EVENTS_LATEST);
  const existing = existingRaw ? JSON.parse(existingRaw) : [];
  const merged = [...existing, ...filtered].slice(-MAX_EVENTS_IN_KV);

  await kv.put(KV_EVENTS_LATEST, JSON.stringify(merged), { expirationTtl: 3_600 });

  return { polled, newEvents: filtered.length, clusters: clustered.length, synthesis, safetyWarnings, ghostCards };
}

module.exports = {
  runIngestCycle,
  getSourceMeta,
  updateSourceMeta,
  KV_EVENTS_LATEST,
  MAX_EVENTS_IN_KV,
};
