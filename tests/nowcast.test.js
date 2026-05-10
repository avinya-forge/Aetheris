const assert = require('assert');
const { nowcastSchema } = require('../lib/schema/nowcast.js');

try {
  assert.strictEqual(typeof nowcastSchema, 'object', 'nowcast.test.js: expected values to be strictly equal');
  assert.strictEqual(nowcastSchema.type, 'object', 'nowcast.test.js: expected values to be strictly equal');
} catch (err) {
  console.error('FAIL - nowcast.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - nowcast.test.js');
