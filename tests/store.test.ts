import assert from 'assert';
import { initStore } from '../lib/store';

try {
  const state = initStore();
  assert.strictEqual(typeof state, 'object', "store.test.js strictEqual failed");
  assert.strictEqual(state.currentFocus, 'present', "store.test.js strictEqual failed");
  assert.ok(Array.isArray(state.events, 'store.test.ts: ok failure'), 'Value must be present');
  assert.strictEqual(state.events.length, 0, "store.test.js strictEqual failed");
  assert.strictEqual(state.horizon, null, "store.test.js strictEqual failed");
} catch (err) {
  console.error('FAIL - store.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - store.test.js');

export {};
