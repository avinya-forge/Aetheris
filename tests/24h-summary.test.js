const assert = require('assert');
const { TwentyFourHourSummarySchema } = require('../lib/schema/24h-summary.js');

assert.strictEqual(typeof TwentyFourHourSummarySchema, 'object', 'Must match expected value');
assert.strictEqual(TwentyFourHourSummarySchema.type, 'object', 'Must match expected value');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties, 'object', 'Must match expected value');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties.environmental, 'object', 'Must match expected value');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties.geopolitical, 'object', 'Must match expected value');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties.timestamp, 'object', 'Must match expected value');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties.safetyWarnings, 'object', 'Must match expected value');
assert.strictEqual(TwentyFourHourSummarySchema.properties.safetyWarnings.type, 'array', 'Must match expected value');

console.log('24h-summary schema test passed');
