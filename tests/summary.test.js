const assert = require('assert');
const { SummarySchema } = require('../lib/schema/summary.js');

assert.strictEqual(typeof SummarySchema, 'object');
assert.strictEqual(typeof SummarySchema.properties.environmental, 'object');
assert.strictEqual(typeof SummarySchema.properties.geopolitical, 'object');
assert.strictEqual(typeof SummarySchema.properties.timestamp, 'object');

console.log('summary schema test passed');
