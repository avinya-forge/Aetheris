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

function makeEvent(id, impactScore = 10, topic = 'world') {
  return { id, source: 'test', text: `Event ${id}`, impactScore, topic };
}

(async () => {
  try {
    // --- getSourceMeta: fresh KV → all defaults ---
    const meta0 = await getSourceMeta(makeMockKv());
    assert.strictEqual(meta0.length, 4, 'must return meta for all 4 sources');
    assert.ok(meta0.every(m => m.lastFetchedAt === 0), 'fresh KV → lastFetchedAt=0');
    assert.ok(meta0.every(m => m.consecutiveEmptyPolls === 0), 'fresh KV → emptyPolls=0');

    // --- updateSourceMeta: new items reset emptyPolls ---
    const kv1 = makeMockKv();
    await updateSourceMeta(kv1, 'gdelt', 3);
    const raw1 = JSON.parse(await kv1.get('source:meta:gdelt'));
    assert.ok(raw1.lastFetchedAt > 0, 'lastFetchedAt must be set after update');
    assert.strictEqual(raw1.consecutiveEmptyPolls, 0, 'new items → emptyPolls reset to 0');

    await updateSourceMeta(kv1, 'gdelt', 0);
    const raw2 = JSON.parse(await kv1.get('source:meta:gdelt'));
    assert.strictEqual(raw2.consecutiveEmptyPolls, 1, 'empty poll → emptyPolls incremented');

    // --- runIngestCycle: no sources due (all fetched recently) ---
    const kvNoDue = makeMockKv({
      'source:meta:noaa-swpc':  JSON.stringify({ lastFetchedAt: Date.now() - 10_000, consecutiveEmptyPolls: 0 }),
      'source:meta:gdelt':      JSON.stringify({ lastFetchedAt: Date.now() - 10_000, consecutiveEmptyPolls: 0 }),
      'source:meta:nasa-donki': JSON.stringify({ lastFetchedAt: Date.now() - 10_000, consecutiveEmptyPolls: 0 }),
      'source:meta:open-meteo': JSON.stringify({ lastFetchedAt: Date.now() - 10_000, consecutiveEmptyPolls: 0 }),
    });
    const noDue = await runIngestCycle({ CACHE: kvNoDue }, {});
    assert.strictEqual(noDue.polled.length, 0, 'no due sources → polled must be empty');
    assert.strictEqual(noDue.newEvents, 0, 'no due sources → newEvents must be 0');
    assert.strictEqual(noDue.clusters, 0, 'no due sources → clusters must be 0');
    assert.deepStrictEqual(noDue.synthesis, {}, 'no due sources → synthesis must be empty object');
    assert.deepStrictEqual(noDue.safetyWarnings, [], 'no due sources → safetyWarnings must be empty array');
    assert.deepStrictEqual(noDue.ghostCards, [], 'no due sources → ghostCards must be empty array');

    // --- runIngestCycle: fresh KV → all sources polled, events stored ---
    const kvFresh = makeMockKv();
    const mockClients = {
      'noaa-swpc':  async () => [makeEvent('kp-1', 30, 'space-weather'), makeEvent('kp-2', 30, 'space-weather')],
      'gdelt':      async () => [makeEvent('art-1', 10, 'world'), makeEvent('art-2', 5, 'world')],
      'nasa-donki': async () => [makeEvent('cme-1', 40, 'space-weather')],
      'open-meteo': async () => [makeEvent('wx-london', 5, 'weather')],
    };
    const result = await runIngestCycle({ CACHE: kvFresh }, mockClients);
    assert.strictEqual(result.polled.length, 4, 'all 4 sources polled');
    assert.ok(result.newEvents > 0, 'new events must be processed');
    assert.ok(typeof result.synthesis === 'object', 'synthesis must be an object');
    assert.ok(Array.isArray(result.safetyWarnings), 'safetyWarnings must be an array');
    assert.ok(Array.isArray(result.ghostCards), 'ghostCards must be an array');

    const stored = JSON.parse(await kvFresh.get(KV_EVENTS_LATEST));
    assert.ok(Array.isArray(stored), 'events:latest must be an array');
    assert.ok(stored.length > 0, 'events:latest must have entries');

    // --- synthesis populated per cluster after pipeline ---
    // clustered by topic, synthesis keys should be cluster IDs
    for (const clusterId of Object.keys(result.synthesis)) {
      assert.strictEqual(typeof result.synthesis[clusterId], 'string', `synthesis[${clusterId}] must be a string`);
    }

    // --- dedup across cycles: same events not re-processed ---
    const result2 = await runIngestCycle({ CACHE: kvFresh }, mockClients);
    assert.strictEqual(result2.newEvents, 0, 'second cycle with same events → 0 new (all seen)');

    // --- injectable synthesizer is called during synthesis ---
    const kvSynth = makeMockKv();
    let synthCallCount = 0;
    const mockSynthesizer = async (text) => { synthCallCount++; return 'AI brief'; };
    const synthResult = await runIngestCycle({ CACHE: kvSynth }, mockClients, mockSynthesizer);
    assert.ok(synthCallCount > 0, 'synthesizer must be called at least once per cluster');
    for (const brief of Object.values(synthResult.synthesis)) {
      assert.strictEqual(brief, 'AI brief', 'synthesizer result must appear in synthesis output');
    }

    // --- source fetch failure is non-fatal ---
    const kvFail = makeMockKv();
    const failClients = {
      'noaa-swpc':  async () => { throw new Error('network timeout'); },
      'gdelt':      async () => [makeEvent('art-ok', 10, 'world')],
      'nasa-donki': async () => [],
      'open-meteo': async () => [],
    };
    const failResult = await runIngestCycle({ CACHE: kvFail }, failClients);
    assert.ok(failResult.polled.includes('gdelt'), 'gdelt must be polled despite noaa failure');
    assert.ok(!failResult.polled.includes('noaa-swpc'), 'failed source must not be in polled list');
    assert.ok(failResult.newEvents >= 1, 'gdelt event must be processed after noaa failure');

    // --- MAX_EVENTS_IN_KV is a positive number ---
    assert.strictEqual(typeof MAX_EVENTS_IN_KV, 'number', 'MAX_EVENTS_IN_KV must be a number');
    assert.ok(MAX_EVENTS_IN_KV >= 100, 'MAX_EVENTS_IN_KV must be at least 100');

    console.log('PASS - ingest-cycle.test.js');
  } catch (err) {
    console.error('FAIL - ingest-cycle.test.js:', err.message);
    process.exit(1);
  }
})();
