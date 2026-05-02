const assert = require('assert');
const { summary24hSchema } = require('../lib/schema/24h-summary.js');

try {
  assert.strictEqual(typeof summary24hSchema, 'object', '24h-summary.test.js assertion failed');
  assert.strictEqual(summary24hSchema.type, 'object', '24h-summary.test.js assertion failed');
} catch (err) {
  console.error('FAIL - 24h-summary.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - 24h-summary.test.js');
