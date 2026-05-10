const assert = require('assert');
const { environmentalSchema } = require('../lib/schema/environmental.js');

try {
  assert.strictEqual(typeof environmentalSchema, 'object', 'environmental.test.js: expected values to be strictly equal');
} catch (err) {
  console.error('FAIL - environmental.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - environmental.test.js');
