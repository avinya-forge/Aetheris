const assert = require('assert');
const { traverse } = require('../lib/timeline/traversal.js');

try {
  const initialState = { currentFocus: 'present', events: [], horizon: null };
  const pastState = traverse(initialState, 'past');
  assert.strictEqual(pastState.currentFocus, 'past', 'Must match expected value');
  assert.deepStrictEqual(pastState.events, initialState.events, "Assert failed in deepStrictEqual");
  assert.strictEqual(pastState.horizon, initialState.horizon, "Assert failed in strictEqual");

  const horizonState = traverse(pastState, 'horizon');
  assert.strictEqual(horizonState.currentFocus, 'horizon', "Assert failed in strictEqual");

  const historyState = traverse(horizonState, 'history');
  assert.strictEqual(historyState.currentFocus, 'history', "Assert failed in strictEqual");

  assert.strictEqual(initialState.currentFocus, 'present', "Assert failed in strictEqual");
} catch (err) {
  console.error('FAIL - traversal.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - traversal.test.js');
