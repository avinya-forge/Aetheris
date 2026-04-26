const assert = require('assert');
const { fetchEventType, fetchNasaDonki, buildUrl, EVENT_TYPES } = require('../lib/data/nasa-donki-client.js');

function makeFetcher(body, status = 200) {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });
}

(async () => {
  try {
    const apiKey = 'TEST_KEY';
    const date = '2026-04-10';

    // --- buildUrl ---
    const url = buildUrl('CME', apiKey, date);
    assert.ok(url.includes('api.nasa.gov'), 'must point to nasa.gov');
    assert.ok(url.includes('api_key=TEST_KEY'), 'API key must be in URL');
    assert.ok(url.includes('startDate=2026-04-10'), 'startDate must be in URL');

    // --- fetchEventType ---
    const rawEvents = [{ activityID: 'cme-1', startTime: '2026-04-10T05:00Z', note: 'test' }];
    const events = await fetchEventType('CME', apiKey, date, makeFetcher(rawEvents));
    assert.strictEqual(events[0].activityID, 'cme-1', 'return raw data');

    // Rate limit (non-200) → return empty array
    const rateLimited = await fetchEventType('CME', apiKey, date, makeFetcher({}, 429));
    assert.deepStrictEqual(rateLimited, [], 'rate-limit → empty array');

    // --- fetchNasaDonki ---
    let callCount = 0;
    const multiFetcher = async () => {
      callCount++;
      return { ok: true, json: async () => [{ activityID: 'x' }] };
    };
    const now = Date.parse('2026-04-11T00:00:00Z');
    const all = await fetchNasaDonki(apiKey, multiFetcher, now);
    assert.strictEqual(callCount, EVENT_TYPES.length, 'must call fetch for each event type');
    assert.ok(all['CME'], 'result must have CME key');

  } catch (err) {
    console.error('FAIL - nasa-donki-client.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - nasa-donki-client.test.js');
