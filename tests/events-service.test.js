const assert = require('assert');
const { fetchEvents } = require('../src/lib/services/events-service.js');

try {
  const all = fetchEvents();
  assert.strictEqual(all.length, 2, 'Should fetch 2 mock events');

  const high = fetchEvents({ impact: 'HIGH' });
  assert.strictEqual(high.length, 1, 'Should filter by HIGH impact');
  assert.strictEqual(high[0].title, 'Solar Flare', 'Correct event returned');

  console.log('PASS - events-service.test.js');
} catch (e) {
  console.error('events-service.test.js failed:', e.message);
  process.exit(1);
}
