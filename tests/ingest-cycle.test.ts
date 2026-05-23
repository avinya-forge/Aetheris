const assert = require('assert');
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
    const result = await runIngestCycle({ CACHE: kvFresh, GEMINI_API_KEY: 'test' }, mockClients, async () => 'AI brief');
    assert.strictEqual(result.polled.length, 4, 'all 4 sources polled');
    assert.ok(result.newEvents > 0, 'new events must be processed');
    assert.ok(typeof result.synthesis === 'object', 'synthesis must be an object');

    const stored = JSON.parse((await kvFresh.get(KV_EVENTS_LATEST)) as string);
    assert.ok(Array.isArray(stored), 'events:latest must be an array');
    assert.ok(stored.length > 0, 'events:latest must have entries');

  } catch (err) {
    console.error('FAIL - ingest-cycle.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - ingest-cycle.test.js');

export {};
