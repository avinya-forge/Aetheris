const assert = require('assert');
const { safetyRuleSchema } = require('../lib/schema/safety-rule.js');

try {
  assert.strictEqual(typeof safetyRuleSchema, 'object', 'safety-rule.test.js assertion failed');
  assert.strictEqual(safetyRuleSchema.type, 'object', 'safety-rule.test.js assertion failed');
} catch (err) {
  console.error('FAIL - safety-rule.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - safety-rule.test.js');
