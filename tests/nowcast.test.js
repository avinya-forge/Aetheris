const assert = require('assert');
const { nowcastSchema } = require('../lib/schema/nowcast.js');

try {
  assert.strictEqual(typeof nowcastSchema, 'object', 'Must match expected value');
  assert.strictEqual(nowcastSchema.type, 'object', 'Must match expected value');
} catch (err) {
  console.error('FAIL - nowcast.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - nowcast.test.js');
