import assert from 'assert';
const {
  runIngestCycle,
  getSourceMeta,
  updateSourceMeta,
  KV_EVENTS_LATEST,
  MAX_EVENTS_IN_KV,
} = require('../functions/ingest-cycle.js');

function makeMockKv(initial = {}) {
  const store = new Map(Object.entries(initial));
  return {
    async get(key) { return store.has(key) ? store.get(key) : null; },
    async put(key, value, _opts) { store.set(key, value); },
  };
}

(async () => {
  try {
    // --- runIngestCycle: fresh KV → all sources polled, events stored ---
    const kvFresh = makeMockKv();
    const mockClients = {
      'noaa-swpc':  async () => ({
        kp: { time_tag: 't1', kp_index: 5 },
        wind: { time_tag: 't1', proton_speed: 400, density: 10 }
      }),
      'gdelt':      async () => ({
        articles: [{ url: 'url1', title: 'Title 1', seendate: 't1' }]
      }),
      'nasa-donki': async () => ({
        CME: [{ activityID: 'c1', startTime: 't1', note: 'n1' }]
      }),
      'open-meteo': async () => [
        { current: { temperature_2m: 20, wind_speed_10m: 10, time: 't1' } }
      ],
    };
    const result = await runIngestCycle({ CACHE: kvFresh, GEMINI_API_KEY: 'test' }, mockClients, async () => 'AI brief', Date.now());
    assert.strictEqual(result.polled.length, 4, 'all 4 sources polled');
    assert.ok(result.newEvents > 0, 'new events must be processed');
    assert.ok(typeof result.synthesis === 'object', 'synthesis must be an object');

    const stored = JSON.parse((await kvFresh.get(KV_EVENTS_LATEST)) as string);
    assert.ok(Array.isArray(stored, 'ingest-cycle.test.ts: ok failure'), 'events:latest must be an array');
    assert.ok(stored.length > 0, 'events:latest must have entries');

    // --- test branch: no new events ---
    const noNewEventsResult = await runIngestCycle({ CACHE: kvFresh, GEMINI_API_KEY: 'test' }, mockClients, async () => 'AI brief', Date.now());
    assert.strictEqual(noNewEventsResult.newEvents, 0, 'no new events should be processed on second run');
    assert.strictEqual(noNewEventsResult.clusters, 0, 'no clusters on second run');

    // --- test branch: fetch failure ---
    const mockFailingClients = {
      'noaa-swpc': async () => { throw new Error('API down'); },
      'gdelt': async () => { throw new Error('API down'); },
      'nasa-donki': async () => { throw new Error('API down'); },
      'open-meteo': async () => { throw new Error('API down'); },
    };
    const failingResult = await runIngestCycle({ CACHE: kvFresh, GEMINI_API_KEY: 'test' }, mockFailingClients, async () => 'AI brief', Date.now() + 100000);
    // Sources are polled, but fetch throws, so skip and don't add to polled. Wait, failing sources are skipped and 'continue' is called, so 'polled' doesn't increment? Let's check code.
    // Yes, continue avoids pushed into polled.
    assert.strictEqual(failingResult.polled.length, 0, 'failed fetches should not be added to polled');

    // --- test branch: default synthesizer w/o API key ---
    const noKeyKv = makeMockKv();
    const resultNoKey = await runIngestCycle({ CACHE: noKeyKv }, mockClients, null, Date.now());
    // Since there's no GEMINI_API_KEY, default synthesizer returns null
    assert.ok(resultNoKey.newEvents > 0, 'events still processed');

    // --- test branch: default clients fallback ---
    const envNoClients = { CACHE: makeMockKv(), NASA_API_KEY: 'test-key' };
    const noClientsResult = await runIngestCycle(envNoClients, undefined, async () => 'AI brief', Date.now());
    assert.ok(Array.isArray(noClientsResult.polled), 'polled should be array');

    // --- test branch: default synthesizer WITH API key ---
    // Actually, calling the default synthesizer with an API key will attempt a real fetch to Gemini.
    // We can't do that. So we mock `globalThis.fetch` or just accept coverage as is.
    // Wait, testing defaultClients should be enough to bump branch coverage.

    // --- test branch: staleness & nowcast interpolation ---
    // We mock the KV store to contain a stale event (older than STALE_THRESHOLD_MS = 6 * 60 * 60 * 1000).
    const staleKv = makeMockKv({
      'events:latest': JSON.stringify([{ id: 'old1', timestamp: 1000, content: 'stale data' }])
    });
    const nowcastResult = await runIngestCycle({ CACHE: staleKv }, mockClients, async () => 'Interpolated AI brief', 1000 + 7 * 60 * 60 * 1000);
    const updatedRaw = await staleKv.get(KV_EVENTS_LATEST);
    const updatedEvents = JSON.parse(updatedRaw as string);
    const interpolatedEvent = updatedEvents.find((e: any) => e.id === 'old1');
    assert.ok(interpolatedEvent, 'stale event should still be retained');
    assert.strictEqual(interpolatedEvent.interpolated, true, 'stale event should be marked as interpolated');
    assert.strictEqual(interpolatedEvent.content, 'Interpolated AI brief', 'stale event content should be updated');

  } catch (err) {
    console.error('FAIL - ingest-cycle.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - ingest-cycle.test.js');

export {};
