const assert = require('assert');
const { SafetyRuleSchema } = require('../lib/schema/safety-rule.js');

assert.strictEqual(typeof SafetyRuleSchema, 'object');
assert.strictEqual(SafetyRuleSchema.type, 'object');
assert.strictEqual(typeof SafetyRuleSchema.properties, 'object');
assert.strictEqual(typeof SafetyRuleSchema.properties.hazardType, 'object');
assert.strictEqual(SafetyRuleSchema.properties.hazardType.type, 'string');
assert.strictEqual(typeof SafetyRuleSchema.properties.severity, 'object');
assert.strictEqual(SafetyRuleSchema.properties.severity.type, 'string');
assert.strictEqual(typeof SafetyRuleSchema.properties.warningMessage, 'object');
assert.strictEqual(SafetyRuleSchema.properties.warningMessage.type, 'string');

console.log('safety-rule schema test passed');
