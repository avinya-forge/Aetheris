const assert = require('assert');
const { NowcastSchema } = require('../lib/schema/nowcast.js');

assert.strictEqual(typeof NowcastSchema, 'object');
assert.strictEqual(NowcastSchema.type, 'object');
assert.strictEqual(typeof NowcastSchema.properties, 'object');
assert.strictEqual(typeof NowcastSchema.properties.timestamp, 'object');
assert.strictEqual(typeof NowcastSchema.properties.data, 'object');

console.log('nowcast schema test passed');
