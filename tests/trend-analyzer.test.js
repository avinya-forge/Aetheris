const assert = require('assert');
const { analyzeTrends } = require('../lib/data/trend-analyzer');

try {
  const clusters = [
    { theme: 'A', impactScore: 10 },
    { theme: 'B', impactScore: 50 },
    { theme: 'C', impactScore: 20 }
  ];

  const topTrend = analyzeTrends(clusters);
  assert.ok(topTrend, 'Value must be truthy');
  assert.strictEqual(topTrend.theme, 'B', 'Must match expected value');

  const emptyResult = analyzeTrends([]);
  assert.strictEqual(emptyResult, null, 'Must match expected value');

  console.log('trend analyzer test passed');
} catch (error) {
  console.error('trend analyzer test failed:', error.message);
  process.exit(1);
}
