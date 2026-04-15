const assert = require('assert');
const { NowcastSchema } = require('../lib/schema/nowcast.js');

assert.strictEqual(typeof NowcastSchema, 'object', 'Must match expected value');
assert.strictEqual(NowcastSchema.type, 'object', 'Must match expected value');
assert.strictEqual(typeof NowcastSchema.properties, 'object', 'Must match expected value');
assert.strictEqual(typeof NowcastSchema.properties.timestamp, 'object', 'Must match expected value');
assert.strictEqual(typeof NowcastSchema.properties.data, 'object', 'Must match expected value');

console.log('nowcast schema test passed');
