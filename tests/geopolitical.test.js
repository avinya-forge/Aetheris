const assert = require('assert');
const { GeopoliticalSchema } = require('../lib/schema/geopolitical.js');

assert.strictEqual(typeof GeopoliticalSchema, 'object');
assert.strictEqual(typeof GeopoliticalSchema.properties.events, 'object');
assert.strictEqual(GeopoliticalSchema.properties.events.type, 'array');

console.log('geopolitical schema test passed');
