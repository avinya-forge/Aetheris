const assert = require('assert');
const { nowcastSchema } = require('../lib/schema/nowcast.js');

try {
  assert.strictEqual(typeof nowcastSchema, 'object', 'nowcast.test.js assertion failed');
  assert.strictEqual(nowcastSchema.type, 'object', 'nowcast.test.js assertion failed');
} catch (err) {
  console.error('FAIL - nowcast.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - nowcast.test.js');
