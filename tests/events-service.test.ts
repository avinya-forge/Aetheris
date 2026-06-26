import assert from 'assert';
import { fetchEvents } from '../src/lib/events-service';

(async () => {
  try {
    const mockNow = 1713300000000;
    const events = await fetchEvents({}, mockNow);

    assert.strictEqual(events.length, 3, 'fetchEvents: should return 3 events');
    assert.strictEqual(events[0].timestamp, mockNow, 'fetchEvents: first event timestamp should match injected "now"');
    assert.strictEqual(events[1].timestamp, mockNow, 'fetchEvents: second event timestamp should match injected "now"');

    const filtered = await fetchEvents({ impact: 'HIGH' }, mockNow);
    assert.strictEqual(filtered.length, 2, 'fetchEvents: should filter by HIGH impact');
    assert.strictEqual(filtered[0].title, 'Solar Flare', 'fetchEvents: first filtered item check');
    assert.strictEqual(filtered[1].title, 'Regional Heatwave', 'fetchEvents: second filtered item check');

    console.log('PASS - events-service.test.js');
  } catch (err: any) {
    console.error('FAIL - events-service.test.js:', err.message);
    process.exit(1);
  }
})();

export {};
