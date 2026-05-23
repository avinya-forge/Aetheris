const assert = require('assert');
const { environmentalSchema } = require('../lib/schema/environmental');

try {
  assert.strictEqual(typeof environmentalSchema, 'object', 'environmental.test.js: value mismatch');
} catch (err) {
  console.error('FAIL - environmental.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - environmental.test.js');

export {};
