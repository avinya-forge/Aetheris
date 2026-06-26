import assert from 'assert';
import { fetchEvents } from '../src/lib/events-service';

// Mock global fetch for Node environment
const originalFetch = globalThis.fetch;

(async () => {
  try {
    const mockNow = 1713300000000;

    // Test 1: Fetch Error / Fallback
    (globalThis as any).fetch = (async () => { throw new Error('Network Error'); });
    const events = await fetchEvents({}, mockNow);
    assert.strictEqual(events.length, 3, 'Should return mock data on fetch error');

    // Test 2: Successful Fetch
    (globalThis as any).fetch = (async () => ({
      ok: true,
      json: async () => [{ id: 'api-1', title: 'API Event', impact: 'HIGH' }]
    }));
    const apiEvents = await fetchEvents({});
    assert.strictEqual(apiEvents.length, 1, 'Should return events from API');
    assert.strictEqual(apiEvents[0].id, 'api-1');

    // Test 3: Filtering
    const filtered = await fetchEvents({ impact: 'HIGH' }, mockNow);
    assert.strictEqual(filtered.length, 1, 'Should filter API events');

    // Cleanup
    globalThis.fetch = originalFetch;
    console.log('PASS - events-service.test.js');
  } catch (err: any) {
    console.error('FAIL - events-service.test.js:', err.message);
    process.exit(1);
  }
})();

export {};
