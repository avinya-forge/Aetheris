const assert = require('assert');
const deduplicateWires = require('../lib/data/wire-deduplicator');

try {
  const wires = [
    { id: '1', text: 'Breaking: Major event happens' },
    { id: '2', text: 'Breaking: Major event happens' },
    { id: '3', text: 'Another totally different event' }
  ];

  const deduped = deduplicateWires(wires);
  assert.strictEqual(Array.isArray(deduped), true);
  assert.strictEqual(deduped.length, 2);
  assert.strictEqual(deduped[0].id, '1');
  assert.strictEqual(deduped[1].id, '3');

  console.log('wire deduplicator test passed');
} catch (error) {
  console.error('wire deduplicator test failed:', error.message);
  process.exit(1);
}
