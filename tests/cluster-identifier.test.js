const assert = require('assert');
const { identifyClusters } = require('../lib/data/cluster-identifier');

try {
  const events = [
    { id: '1', topic: 'Climate' },
    { id: '2', topic: 'Climate' },
    { id: '3', topic: 'Economy' }
  ];

  const clusters = identifyClusters(events);

  assert.strictEqual(Array.isArray(clusters), true, 'Must match expected value');
  assert.strictEqual(clusters.length, 2, 'Must match expected value');

  const climateCluster = clusters.find(c => c.theme === 'Climate');
  assert.ok(climateCluster, 'Value must be truthy');
  assert.deepStrictEqual(climateCluster.events, ['1', '2'], 'Must match');
  assert.strictEqual(climateCluster.impactScore, 10, 'Must match expected value'); // 2 events * 5 = 10

  const economyCluster = clusters.find(c => c.theme === 'Economy');
  assert.ok(economyCluster, 'Value must be truthy');
  assert.deepStrictEqual(economyCluster.events, ['3'], 'Must match');
  assert.strictEqual(economyCluster.impactScore, 5, 'Must match expected value'); // 1 event * 5 = 5

} catch (error) {
  console.error('cluster identifier test failed:', error.message);
  process.exit(1);
}
console.log('PASS - cluster-identifier.test.js');
