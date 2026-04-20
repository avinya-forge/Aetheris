const assert = require('assert');
const { isStale, STALE_THRESHOLD_MS } = require('../lib/data/staleness-detector');

try {
  const now = 10000000;

  assert.strictEqual(isStale(null, now), false, 'Should handle null');
  assert.strictEqual(isStale({}, now), false, 'Should handle empty object');

  assert.strictEqual(isStale({ timestamp: now }, now), false, 'Should be fresh');
  assert.strictEqual(isStale({ timestamp: now - STALE_THRESHOLD_MS + 1 }, now), false, 'Should be fresh just before 6h');
  assert.strictEqual(isStale({ timestamp: now - STALE_THRESHOLD_MS }, now), true, 'Should be stale exactly at 6h');
  assert.strictEqual(isStale({ publishedAt: now - STALE_THRESHOLD_MS - 1000 }, now), true, 'Should be stale past 6h with publishedAt');

} catch (error) {
  console.error('staleness-detector test failed:', error.message);
  process.exit(1);
}
console.log('PASS - staleness-detector.test.js');
