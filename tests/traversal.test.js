const assert = require('assert');
const { traverse } = require('../lib/timeline/traversal.js');

try {
  const initialState = { currentFocus: 'present', events: [], horizon: null };
  const pastState = traverse(initialState, 'past');
  assert.strictEqual(pastState.currentFocus, 'past', 'Must match expected value');
  assert.deepStrictEqual(pastState.events, initialState.events);
  assert.strictEqual(pastState.horizon, initialState.horizon);

  const horizonState = traverse(pastState, 'horizon');
  assert.strictEqual(horizonState.currentFocus, 'horizon');

  const historyState = traverse(horizonState, 'history');
  assert.strictEqual(historyState.currentFocus, 'history');

  assert.strictEqual(initialState.currentFocus, 'present');
} catch (err) {
  console.error('FAIL - traversal.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - traversal.test.js');
