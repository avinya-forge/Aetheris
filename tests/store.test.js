const assert = require('assert');
const { initStore } = require('../lib/timeline/store.js');

try {
  const state = initStore();
  assert.strictEqual(typeof state, 'object');
  assert.strictEqual(state.currentFocus, 'present');
  assert.ok(Array.isArray(state.events), 'Value must be truthy');
  assert.strictEqual(state.events.length, 0);
  assert.strictEqual(state.horizon, null);
} catch (err) {
  console.error('FAIL - store.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - store.test.js');
