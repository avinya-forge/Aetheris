const assert = require('assert');
const { GhostCardSchema } = require('../lib/schema/ghost-card.js');

assert.strictEqual(typeof GhostCardSchema, 'object', 'Must match expected value');
assert.strictEqual(GhostCardSchema.type, 'object', 'Must match expected value');
assert.strictEqual(typeof GhostCardSchema.properties, 'object', 'Must match expected value');
assert.strictEqual(typeof GhostCardSchema.properties.likelihood, 'object', 'Must match expected value');
assert.strictEqual(GhostCardSchema.properties.likelihood.type, 'number', 'Must match expected value');
assert.strictEqual(typeof GhostCardSchema.properties.speculative, 'object', 'Must match expected value');
assert.strictEqual(GhostCardSchema.properties.speculative.type, 'boolean', 'Must match expected value');
assert.strictEqual(typeof GhostCardSchema.properties.eventDetails, 'object', 'Must match expected value');
assert.strictEqual(GhostCardSchema.properties.eventDetails.type, 'object', 'Must match expected value');

console.log('ghost-card schema test passed');
