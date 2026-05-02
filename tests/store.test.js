const assert = require('assert');
const { initStore } = require('../lib/timeline/store.js');

try {
  const state = initStore();
  assert.strictEqual(typeof state, 'object', "store.test.js strictEqual failed");
  assert.strictEqual(state.currentFocus, 'present', "store.test.js strictEqual failed");
  assert.ok(Array.isArray(state.events), 'Value must be truthy');
  assert.strictEqual(state.events.length, 0, "store.test.js strictEqual failed");
  assert.strictEqual(state.horizon, null, "store.test.js strictEqual failed");
} catch (err) {
  console.error('FAIL - store.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - store.test.js');
