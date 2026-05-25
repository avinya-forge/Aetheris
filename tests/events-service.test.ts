import assert from 'assert';
import { fetchEvents } from '../src/lib/events-service';

try {
  const mockNow = 1713300000000;
  const events = fetchEvents({}, mockNow);

  assert.strictEqual(events.length, 2, 'fetchEvents: should return 2 events');
  assert.strictEqual(events[0].timestamp, mockNow, 'fetchEvents: first event timestamp should match injected "now"');
  assert.strictEqual(events[1].timestamp, mockNow, 'fetchEvents: second event timestamp should match injected "now"');

  const filtered = fetchEvents({ impact: 'HIGH' }, mockNow);
  assert.strictEqual(filtered.length, 1, 'fetchEvents: should filter by impact');
  assert.strictEqual(filtered[0].title, 'Solar Flare', 'fetchEvents: filtered item should be Solar Flare');

  console.log('PASS - events-service.test.js');
} catch (err) {
  console.error('FAIL - events-service.test.js:', err.message);
  process.exit(1);
}

export {};
