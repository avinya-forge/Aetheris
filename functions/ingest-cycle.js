// Sniffer Agent — Ingest Cycle Orchestrator
// Runs on Cloudflare Worker Cron (every 1 min via wrangler.toml).
// Pulls only sources that are due (rankSources), fingerprints events,
// skips seen events, runs the pipeline, and writes to KV.
//
// Injectable clients + KV mock for testing — no real network calls in tests.

const { rankSources } = require('../lib/data/source-ranker.js');
const { isNewEvent, markEventSeen } = require('../lib/data/event-fingerprint.js');
const { deduplicateWires } = require('../lib/data/wire-deduplicator.js');
const { identifyClusters } = require('../lib/data/cluster-identifier.js');
const { filterByImpact } = require('../lib/data/impact-filter.js');

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
function defaultClients(env) {
  // Lazy-require so tests that don't need network don't load live clients
  const { fetchNoaaSwpc } = require('../lib/data/noaa-swpc-client.js');
  const { fetchGdelt } = require('../lib/data/gdelt-client.js');
  const { fetchOpenMeteo } = require('../lib/data/open-meteo-client.js');
  const { fetchNasaDonki } = require('../lib/data/nasa-donki-client.js');

  return {
    'noaa-swpc':  () => fetchNoaaSwpc(),
    'gdelt':      () => fetchGdelt(),
    'open-meteo': () => fetchOpenMeteo(),
    'nasa-donki': () => fetchNasaDonki(env.NASA_API_KEY || 'DEMO_KEY'),
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
async function updateSourceMeta(kv, id, newItemCount) {
  const raw = await kv.get(KV_SOURCE_META(id));
  const prev = raw ? JSON.parse(raw) : {};
  const consecutiveEmptyPolls = newItemCount === 0
    ? (prev.consecutiveEmptyPolls || 0) + 1
    : 0; // reset on any new content

  await kv.put(
    KV_SOURCE_META(id),
    JSON.stringify({ lastFetchedAt: Date.now(), consecutiveEmptyPolls }),
    { expirationTtl: 7 * 86_400 }
  );
}

/**
 * Ingest cycle — the core sniffer loop.
 *
 * @param {{ CACHE: { get, put }, NASA_API_KEY?: string }} env - Cloudflare Worker env bindings
 * @param {Object|null} [clients] - injectable client map for testing
 * @returns {Promise<{ polled: string[], newEvents: number, clusters: number }>}
 */
async function runIngestCycle(env, clients = null) {
  const kv = env.CACHE;
  const resolvedClients = clients || defaultClients(env);

  // 1. Determine which sources are due for polling
  const sourcesMeta = await getSourceMeta(kv);
  const ranked = rankSources(sourcesMeta);

  if (ranked.length === 0) {
    return { polled: [], newEvents: 0, clusters: 0 };
  }

  // 2. Fetch due sources, fingerprint, skip seen events
  const freshEvents = [];
  const polled = [];

  for (const { id } of ranked) {
    const fetch = resolvedClients[id];
    if (!fetch) continue;

    let rawItems = [];
    try {
      const result = await fetch();
      rawItems = Array.isArray(result) ? result : [result].filter(Boolean);
    } catch (_) {
      // Source failure → don't update lastFetchedAt so it retries next cycle
      continue;
    }

    let newCount = 0;
    for (const item of rawItems) {
      if (await isNewEvent(kv, item)) {
        await markEventSeen(kv, item);
        freshEvents.push(item);
        newCount++;
      }
    }

    await updateSourceMeta(kv, id, newCount);
    polled.push(id);
  }

  if (freshEvents.length === 0) {
    return { polled, newEvents: 0, clusters: 0 };
  }

  // 3. Run through pipeline
  const deduped = deduplicateWires(freshEvents);
  const filtered = filterByImpact(deduped, { minImpactScore: DEFAULT_MIN_IMPACT });
  const clustered = identifyClusters(filtered);

  // 4. Merge with existing events, cap at MAX_EVENTS_IN_KV, write back
  const existingRaw = await kv.get(KV_EVENTS_LATEST);
  const existing = existingRaw ? JSON.parse(existingRaw) : [];
  const merged = [...existing, ...filtered].slice(-MAX_EVENTS_IN_KV);

  await kv.put(KV_EVENTS_LATEST, JSON.stringify(merged), { expirationTtl: 3_600 });

  return { polled, newEvents: filtered.length, clusters: clustered.length };
}

module.exports = {
  runIngestCycle,
  getSourceMeta,
  updateSourceMeta,
  KV_EVENTS_LATEST,
  MAX_EVENTS_IN_KV,
};
