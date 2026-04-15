const assert = require('assert');
const { SafetyRuleSchema } = require('../lib/schema/safety-rule.js');

assert.strictEqual(typeof SafetyRuleSchema, 'object', 'Must match expected value');
assert.strictEqual(SafetyRuleSchema.type, 'object', 'Must match expected value');
assert.strictEqual(typeof SafetyRuleSchema.properties, 'object', 'Must match expected value');
assert.strictEqual(typeof SafetyRuleSchema.properties.hazardType, 'object', 'Must match expected value');
assert.strictEqual(SafetyRuleSchema.properties.hazardType.type, 'string', 'Must match expected value');
assert.strictEqual(typeof SafetyRuleSchema.properties.severity, 'object', 'Must match expected value');
assert.strictEqual(SafetyRuleSchema.properties.severity.type, 'string', 'Must match expected value');
assert.strictEqual(typeof SafetyRuleSchema.properties.warningMessage, 'object', 'Must match expected value');
assert.strictEqual(SafetyRuleSchema.properties.warningMessage.type, 'string', 'Must match expected value');

console.log('safety-rule schema test passed');
