const assert = require('assert');
const { GhostCardSchema } = require('../lib/schema/ghost-card.js');

assert.strictEqual(typeof GhostCardSchema, 'object');
assert.strictEqual(GhostCardSchema.type, 'object');
assert.strictEqual(typeof GhostCardSchema.properties, 'object');
assert.strictEqual(typeof GhostCardSchema.properties.likelihood, 'object');
assert.strictEqual(GhostCardSchema.properties.likelihood.type, 'number');
assert.strictEqual(typeof GhostCardSchema.properties.speculative, 'object');
assert.strictEqual(GhostCardSchema.properties.speculative.type, 'boolean');
assert.strictEqual(typeof GhostCardSchema.properties.eventDetails, 'object');
assert.strictEqual(GhostCardSchema.properties.eventDetails.type, 'object');

console.log('ghost-card schema test passed');
