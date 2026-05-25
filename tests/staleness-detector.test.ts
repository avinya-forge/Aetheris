import assert from 'assert';
import { isStale, STALE_THRESHOLD_MS } from '../lib/staleness-detector';

try {
  const now = 10000000;

  assert.strictEqual(isStale(null, now, 'staleness-detector.test.ts: strictEqual failure'), false, 'Should handle null');
  assert.strictEqual(isStale({}, now, 'staleness-detector.test.ts: strictEqual failure'), false, 'Should handle empty object');

  assert.strictEqual(isStale({ timestamp: now }, now, 'staleness-detector.test.ts: strictEqual failure'), false, 'Should be fresh');
  assert.strictEqual(isStale({ timestamp: now - STALE_THRESHOLD_MS + 1 }, now, 'staleness-detector.test.ts: strictEqual failure'), false, 'Should be fresh just before 6h');
  assert.strictEqual(isStale({ timestamp: now - STALE_THRESHOLD_MS }, now, 'staleness-detector.test.ts: strictEqual failure'), true, 'Should be stale exactly at 6h');
  assert.strictEqual(isStale({ publishedAt: now - STALE_THRESHOLD_MS - 1000 }, now, 'staleness-detector.test.ts: strictEqual failure'), true, 'Should be stale past 6h with publishedAt');

} catch (error) {
  console.error('staleness-detector test failed:', error.message);
  process.exit(1);
}
console.log('PASS - staleness-detector.test.js');

export {};
