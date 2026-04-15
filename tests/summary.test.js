const assert = require('assert');
const { SummarySchema } = require('../lib/schema/summary.js');

assert.strictEqual(typeof SummarySchema, 'object', 'Must match expected value');
assert.strictEqual(typeof SummarySchema.properties.environmental, 'object', 'Must match expected value');
assert.strictEqual(typeof SummarySchema.properties.geopolitical, 'object', 'Must match expected value');
assert.strictEqual(typeof SummarySchema.properties.timestamp, 'object', 'Must match expected value');

console.log('summary schema test passed');
