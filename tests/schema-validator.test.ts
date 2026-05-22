const assert = require('assert');
const { validateEvent } = require('../lib/data/schema-validator');

try {
  assert.strictEqual(validateEvent(null), false, 'Should reject null');
  assert.strictEqual(validateEvent({}), false, 'Should reject empty object');
  assert.strictEqual(validateEvent({ id: '123' }), false, 'Should reject missing timestamp');
  assert.strictEqual(validateEvent({ id: '123', timestamp: 1713600000000 }), true, 'Should accept valid event');
} catch (error) {
  console.error('schema-validator test failed:', error.message);
  process.exit(1);
}
console.log('PASS - schema-validator.test.js');

export {};
