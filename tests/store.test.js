const assert = require('assert');
const { initStore } = require('../lib/timeline/store.js');

try {
  const state = initStore();
  assert.strictEqual(typeof state, 'object', "Assert failed in strictEqual");
  assert.strictEqual(state.currentFocus, 'present', "Assert failed in strictEqual");
  assert.ok(Array.isArray(state.events), 'Value must be truthy');
  assert.strictEqual(state.events.length, 0, "Assert failed in strictEqual");
  assert.strictEqual(state.horizon, null, "Assert failed in strictEqual");
} catch (err) {
  console.error('FAIL - store.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - store.test.js');
