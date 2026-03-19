const assert = require('assert');
const { TwentyFourHourSummarySchema } = require('../lib/schema/24h-summary.js');

assert.strictEqual(typeof TwentyFourHourSummarySchema, 'object');
assert.strictEqual(TwentyFourHourSummarySchema.type, 'object');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties, 'object');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties.environmental, 'object');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties.geopolitical, 'object');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties.timestamp, 'object');
assert.strictEqual(typeof TwentyFourHourSummarySchema.properties.safetyWarnings, 'object');
assert.strictEqual(TwentyFourHourSummarySchema.properties.safetyWarnings.type, 'array');

console.log('24h-summary schema test passed');
