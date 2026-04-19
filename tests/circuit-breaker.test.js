const assert = require('assert');
const { getCircuitState } = require('../lib/data/circuit-breaker');

try {
  const now = 100000;

  // Should be closed initially
  assert.deepStrictEqual(getCircuitState('src1', 0, 0, now), { isOpen: false, retryAfter: 0 }, 'Should be closed with 0 errors');

  // Should be closed with 4 errors
  assert.deepStrictEqual(getCircuitState('src1', 4, now, now), { isOpen: false, retryAfter: 0 }, 'Should be closed with 4 errors');

  // Should open on 5 errors
  const openState = getCircuitState('src1', 5, now, now);
  assert.strictEqual(openState.isOpen, true, 'Should be open with 5 errors');
  assert.strictEqual(openState.retryAfter, 60000, 'Should have 60s cooloff');

  // Should remain open at 30s
  const midState = getCircuitState('src1', 5, now, now + 30000);
  assert.strictEqual(midState.isOpen, true, 'Should remain open at 30s');
  assert.strictEqual(midState.retryAfter, 30000, 'Should have 30s cooloff left');

  // Should close after 60s
  assert.deepStrictEqual(getCircuitState('src1', 5, now, now + 60000), { isOpen: false, retryAfter: 0 }, 'Should close after 60s');

} catch (error) {
  console.error('circuit-breaker test failed:', error.message);
  process.exit(1);
}
console.log('PASS - circuit-breaker.test.js');
