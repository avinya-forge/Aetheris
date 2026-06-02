import assert from 'assert';
import { identifyClusters } from '../lib/cluster-identifier';

try {
  const events = [
    { id: '1', topic: 'Climate' },
    { id: '2', topic: 'Climate' },
    { id: '3', topic: 'Economy' }
  ];

  const clusters = identifyClusters(events);

  assert.strictEqual(Array.isArray(clusters), true, 'cluster-identifier.test.js: value mismatch');
  assert.strictEqual(clusters.length, 2, 'cluster-identifier.test.js: value mismatch');

  const climateCluster = clusters.find(c => c.theme === 'Climate');
  assert.ok(climateCluster, 'cluster-identifier.test.js: missing value');
  assert.deepStrictEqual(climateCluster.events, ['1', '2'], 'cluster-identifier.test.js must match');
  assert.strictEqual(climateCluster.impactScore, 10, 'cluster-identifier.test.js: value mismatch'); // 2 events * 5 = 10

  const economyCluster = clusters.find(c => c.theme === 'Economy');
  assert.ok(economyCluster, 'cluster-identifier.test.js: missing value');
  assert.deepStrictEqual(economyCluster.events, ['3'], 'cluster-identifier.test.js must match');
  assert.strictEqual(economyCluster.impactScore, 5, 'cluster-identifier.test.js: value mismatch'); // 1 event * 5 = 5

} catch (error) {
  console.error('cluster identifier test failed:', error.message);
  process.exit(1);
}
console.log('PASS - cluster-identifier.test.js');

export {};
