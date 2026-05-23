const assert = require('assert');
const { safetyRuleSchema } = require('../lib/schema/safety-rule');

try {
  assert.strictEqual(typeof safetyRuleSchema, 'object', 'safety-rule.test.js: value mismatch');
  assert.strictEqual(safetyRuleSchema.type, 'object', 'safety-rule.test.js: value mismatch');
} catch (err) {
  console.error('FAIL - safety-rule.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - safety-rule.test.js');

export {};
