const assert = require('assert');
const { EnvironmentalSchema } = require('../lib/schema/environmental.js');

assert.strictEqual(typeof EnvironmentalSchema, 'object', 'Must match expected value');
assert.strictEqual(typeof EnvironmentalSchema.properties.weather, 'object', 'Must match expected value');
assert.strictEqual(typeof EnvironmentalSchema.properties.spaceWeather, 'object', 'Must match expected value');
assert.strictEqual(typeof EnvironmentalSchema.properties.climate, 'object', 'Must match expected value');

console.log('environmental schema test passed');
