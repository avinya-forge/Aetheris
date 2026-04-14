const assert = require('assert');
const { fetchNasaDonki, fetchEventType, buildUrl, EVENT_TYPES } = require('../lib/data/nasa-donki-client.js');
const { DONKI_IMPACT_BY_TYPE } = require('../lib/data/space-weather-mapper.js');

(async () => {
  try {
    // --- buildUrl ---
    const url = buildUrl('CME', 'DEMO_KEY', '2026-04-09');
    assert.ok(url.includes('api.nasa.gov/DONKI/CME'), 'URL must target CME endpoint');
    assert.ok(url.includes('api_key=DEMO_KEY'), 'api_key param present');
    assert.ok(url.includes('startDate=2026-04-09'), 'startDate param present');

    // --- fetchEventType ---
    const mockCME = [
      { messageID: 'msg-1', startTime: '2026-04-09T12:00Z', note: 'Earth-directed CME detected.' },
      { activityID: 'act-2', beginTime: '2026-04-09T13:00Z', note: 'Fast CME' },
    ];
    const fetcher = async () => ({ ok: true, json: async () => mockCME });

    const events = await fetchEventType('CME', 'DEMO_KEY', '2026-04-09', fetcher);
    assert.strictEqual(events.length, 2, 'must return all CME events');
    assert.strictEqual(events[0].id, 'msg-1', 'messageID used as id');
    assert.strictEqual(events[1].id, 'act-2', 'activityID fallback id');
    assert.strictEqual(events[0].source, 'nasa-donki', 'source must be nasa-donki');
    assert.strictEqual(events[0].eventType, 'CME', 'eventType preserved');
    assert.strictEqual(events[0].impactScore, DONKI_IMPACT_BY_TYPE['CME'], 'CME impact score correct');
    assert.strictEqual(events[0].topic, 'space-weather', 'topic must be space-weather');
    assert.ok(events[0].note.length <= 200, 'note capped at 200 chars');

    // HTTP failure → empty array (not throw)
    const failFetcher = async () => ({ ok: false, status: 429, json: async () => [] });
    const failResult = await fetchEventType('CME', 'DEMO_KEY', '2026-04-09', failFetcher);
    assert.deepStrictEqual(failResult, [], 'HTTP failure → empty array, no throw');

    // Non-array response → empty array
    const nonArrayFetcher = async () => ({ ok: true, json: async () => ({ error: 'bad' }) });
    const nonArray = await fetchEventType('FLR', 'DEMO_KEY', '2026-04-09', nonArrayFetcher);
    assert.deepStrictEqual(nonArray, [], 'non-array response → empty array');

    // --- fetchNasaDonki (all types) ---
    let callCount = 0;
    const multiTypeFetcher = async () => {
      callCount++;
      return { ok: true, json: async () => [{ messageID: `m-${callCount}`, startTime: 't', note: '' }] };
    };
    const all = await fetchNasaDonki('DEMO_KEY', multiTypeFetcher);
    assert.strictEqual(callCount, EVENT_TYPES.length, 'one fetch per event type');
    assert.strictEqual(all.length, EVENT_TYPES.length, 'one event per type returned');

    // --- DONKI_IMPACT_BY_TYPE priority ordering ---
    assert.ok(DONKI_IMPACT_BY_TYPE['CME'] > DONKI_IMPACT_BY_TYPE['MPC'], 'CME must outrank MPC');
    assert.ok(DONKI_IMPACT_BY_TYPE['SEP'] > DONKI_IMPACT_BY_TYPE['MPC'], 'SEP must outrank MPC');
    assert.strictEqual(EVENT_TYPES.length, 4, 'exactly 4 event types');

    console.log('PASS - nasa-donki-client.test.js');
  } catch (err) {
    console.error('FAIL - nasa-donki-client.test.js:', err.message);
    process.exit(1);
  }
})();
