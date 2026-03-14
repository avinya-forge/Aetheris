const assert = require('assert');
const { EnvironmentalSchema } = require('../lib/schema/environmental.js');

assert.strictEqual(typeof EnvironmentalSchema, 'object');
assert.strictEqual(typeof EnvironmentalSchema.properties.weather, 'object');
assert.strictEqual(typeof EnvironmentalSchema.properties.spaceWeather, 'object');
assert.strictEqual(typeof EnvironmentalSchema.properties.climate, 'object');

console.log('environmental schema test passed');
