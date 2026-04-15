const assert = require('assert');
const { GeopoliticalSchema } = require('../lib/schema/geopolitical.js');

assert.strictEqual(typeof GeopoliticalSchema, 'object', 'Must match expected value');
assert.strictEqual(typeof GeopoliticalSchema.properties.events, 'object', 'Must match expected value');
assert.strictEqual(GeopoliticalSchema.properties.events.type, 'array', 'Must match expected value');

console.log('geopolitical schema test passed');
