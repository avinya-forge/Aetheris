const assert = require('assert');
const { InterestThresholdSchema } = require('../lib/data/threshold-schema.js');

assert.strictEqual(typeof InterestThresholdSchema, 'object');
assert.strictEqual(InterestThresholdSchema.type, 'object');
assert.strictEqual(typeof InterestThresholdSchema.properties, 'object');
assert.strictEqual(typeof InterestThresholdSchema.properties.county, 'object');
assert.strictEqual(typeof InterestThresholdSchema.properties.interests, 'object');
assert.strictEqual(typeof InterestThresholdSchema.properties.minImpactScore, 'object');

console.log('threshold schema test passed');
