const assert = require('assert');
const { identifyClusters } = require('../lib/data/cluster-identifier');

try {
  const events = [
    { id: '1', topic: 'Climate' },
    { id: '2', topic: 'Climate' },
    { id: '3', topic: 'Economy' }
  ];

  const clusters = identifyClusters(events);

  assert.strictEqual(Array.isArray(clusters), true);
  assert.strictEqual(clusters.length, 2);

  const climateCluster = clusters.find(c => c.theme === 'Climate');
  assert.ok(climateCluster);
  assert.deepStrictEqual(climateCluster.events, ['1', '2']);
  assert.strictEqual(climateCluster.impactScore, 10); // 2 events * 5 = 10

  const economyCluster = clusters.find(c => c.theme === 'Economy');
  assert.ok(economyCluster);
  assert.deepStrictEqual(economyCluster.events, ['3']);
  assert.strictEqual(economyCluster.impactScore, 5); // 1 event * 5 = 5

  console.log('cluster identifier test passed');
} catch (error) {
  console.error('cluster identifier test failed:', error.message);
  process.exit(1);
}
