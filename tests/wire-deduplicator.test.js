const assert = require('assert');
const deduplicateWires = require('../lib/data/wire-deduplicator.js');

try {
  const wires = [
    { id: 1, hash: 'xyz', text: 'News A' },
    { id: 2, hash: 'xyz', text: 'News B' },
    { id: 3, hash: 'abc', text: 'News C' }
  ];

  const deduped = deduplicateWires(wires);

  assert.strictEqual(Array.isArray(deduped), true, 'should return an array');
  assert.strictEqual(deduped.length, 2, 'should deduplicate wires based on hash to 2 items');
  assert.strictEqual(deduped[0].id, 1, 'should keep the first wire encountered for a hash');

  const textWires = [
    { id: 1, text: 'A' },
    { id: 2, text: ' A ' }
  ];
  const dedupedText = deduplicateWires(textWires);
  assert.strictEqual(dedupedText.length, 1, 'fallback text deduplication should return array length 1');
  assert.strictEqual(dedupedText[0].id, 1, 'should keep the first wire encountered for a text match');

  console.log('PASS - wire-deduplicator.test.js');
} catch (error) {
  console.error('FAIL - wire-deduplicator.test.js:', error.message);
  process.exit(1);
}
