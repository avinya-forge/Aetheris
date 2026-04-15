const assert = require('assert');
const { filterByThreshold } = require('../lib/data/threshold-filter');

try {
  assert.strictEqual(filterByThreshold({ impactScore: 80 }, { minImpactScore: 50 }), true, 'Must match');
  assert.strictEqual(filterByThreshold({ impactScore: 40 }, { minImpactScore: 50 }), false, 'Must match');
  assert.strictEqual(filterByThreshold({ impactScore: 50 }, { minImpactScore: 50 }), true, 'Must match');
  assert.strictEqual(filterByThreshold({ }, { minImpactScore: 50 }), false, 'Must match');
  assert.strictEqual(filterByThreshold({ impactScore: 80 }, { }), false, 'Must match');
  assert.strictEqual(filterByThreshold(null, { minImpactScore: 50 }), false, 'Must match');

  console.log('PASS - threshold-filter.test.js');
} catch (error) {
  console.error('FAIL - threshold-filter.test.js:', error.message);
  process.exit(1);
}
