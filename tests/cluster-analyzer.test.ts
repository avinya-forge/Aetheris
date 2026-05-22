const assert = require('assert');
const { analyzeClusters } = require('../lib/data/cluster-analyzer');

try {
  const events = [
    { text: 'A', keywords: ['trade', 'economics'] },
    { text: 'B', keywords: ['trade', 'politics'] },
    { text: 'C', keywords: ['weather', 'climate'] },
    { text: 'D', keywords: ['politics', 'climate'] }
  ];

  const clusters = analyzeClusters(events);

  assert.strictEqual(Array.isArray(clusters), true, 'clusters should be an array');
  assert.strictEqual(clusters.length, 1, 'should have 1 merged cluster bridging all events');

  const tradeCluster = clusters.find(c => c.keywords.includes('trade'));
  assert.ok(tradeCluster, 'should find a trade cluster');
  assert.strictEqual(tradeCluster.events.length, 4, 'trade cluster should contain 4 events');

} catch (error) {
  console.error('FAIL - cluster-analyzer.test.js:', error.message);
  process.exit(1);
}
console.log('PASS - cluster-analyzer.test.js');

export {};
