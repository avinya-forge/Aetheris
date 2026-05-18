const assert = require('assert');
const { summarySchema } = require('../lib/schema/summary.js');

try {
  assert.strictEqual(typeof summarySchema, 'object', 'summary.test.js: value mismatch');
} catch (err) {
  console.error('FAIL - summary.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - summary.test.js');
