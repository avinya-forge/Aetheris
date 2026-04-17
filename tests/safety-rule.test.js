const assert = require('assert');
const { safetyRuleSchema } = require('../lib/schema/safety-rule.js');

try {
  assert.strictEqual(typeof safetyRuleSchema, 'object', 'Must match expected value');
  assert.strictEqual(safetyRuleSchema.type, 'object', 'Must match expected value');
} catch (err) {
  console.error('FAIL - safety-rule.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - safety-rule.test.js');
