const assert = require('assert');
const { traverse } = require('../lib/timeline/traversal.js');

try {
  const initialState = { currentFocus: 'present', events: [], horizon: null };
  const pastState = traverse(initialState, 'past');
  assert.strictEqual(pastState.currentFocus, 'past', 'traversal.test.js: expected values to be strictly equal');
  assert.deepStrictEqual(pastState.events, initialState.events, "Assert failed in deepStrictEqual");
  assert.strictEqual(pastState.horizon, initialState.horizon, "traversal.test.js strictEqual failed");

  const horizonState = traverse(pastState, 'horizon');
  assert.strictEqual(horizonState.currentFocus, 'horizon', "traversal.test.js strictEqual failed");

  const historyState = traverse(horizonState, 'history');
  assert.strictEqual(historyState.currentFocus, 'history', "traversal.test.js strictEqual failed");

  assert.strictEqual(initialState.currentFocus, 'present', "traversal.test.js strictEqual failed");
} catch (err) {
  console.error('FAIL - traversal.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - traversal.test.js');
