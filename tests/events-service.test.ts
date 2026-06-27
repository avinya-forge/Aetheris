import assert from 'assert';
import { fetchEvents } from '../src/lib/events-service';

const originalFetch = globalThis.fetch;

(async () => {
  try {
    const mockNow = 1713300000000;

    // Test 1: Fetch Error / Fallback
    (globalThis as any).fetch = (async () => { throw new Error('Network Error'); });
    const events = await fetchEvents({}, mockNow);
    assert.strictEqual(events.length, 9);

    // Test 2: Successful Fetch
    (globalThis as any).fetch = (async () => ({
      ok: true,
      json: async () => [{ id: 'api-1', title: 'API Event', impactScore: 70 }]
    }));
    const apiEvents = await fetchEvents({});
    assert.strictEqual(apiEvents.length, 1);

    // Test 3: History query
    (globalThis as any).fetch = (async (url: string) => ({
      ok: url.includes('date=2026'),
      json: async () => [{ id: 'archive-1' }]
    }));
    const archive = await fetchEvents({ date: '2026-01-01' });
    assert.strictEqual(archive[0].id, 'archive-1');

    globalThis.fetch = originalFetch;
    console.log('PASS - events-service.test.js');
  } catch (err: any) {
    console.error('FAIL - events-service.test.js:', err.message);
    process.exit(1);
  }
})();
export {};
