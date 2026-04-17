const assert = require('assert');
const { InterestThresholdSchema } = require('../lib/schema/threshold.js');

assert.strictEqual(InterestThresholdSchema.type, 'object', 'InterestThresholdSchema must be an object type');
assert.ok(InterestThresholdSchema.properties, 'InterestThresholdSchema must have properties');
console.log('threshold schema test passed');
