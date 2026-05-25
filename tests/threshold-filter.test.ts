import assert from 'assert';
import { filterByThreshold } from '../lib/threshold-filter';

try {
  assert.strictEqual(filterByThreshold({ impactScore: 80 }, { minImpactScore: 50 }, 'threshold-filter.test.ts: strictEqual failure'), true, 'threshold-filter.test.js must match');
  assert.strictEqual(filterByThreshold({ impactScore: 40 }, { minImpactScore: 50 }, 'threshold-filter.test.ts: strictEqual failure'), false, 'threshold-filter.test.js must match');
  assert.strictEqual(filterByThreshold({ impactScore: 50 }, { minImpactScore: 50 }, 'threshold-filter.test.ts: strictEqual failure'), true, 'threshold-filter.test.js must match');
  assert.strictEqual(filterByThreshold({ }, { minImpactScore: 50 }, 'threshold-filter.test.ts: strictEqual failure'), false, 'threshold-filter.test.js must match');
  assert.strictEqual(filterByThreshold({ impactScore: 80 }, { }, 'threshold-filter.test.ts: strictEqual failure'), false, 'threshold-filter.test.js must match');
  assert.strictEqual(filterByThreshold(null, { minImpactScore: 50 }, 'threshold-filter.test.ts: strictEqual failure'), false, 'threshold-filter.test.js must match');

} catch (error) {
  console.error('FAIL - threshold-filter.test.js:', error.message);
  process.exit(1);
}
console.log('PASS - threshold-filter.test.js');

export {};
