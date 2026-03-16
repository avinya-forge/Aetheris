const assert = require('assert');
const { ForecastSchema } = require('../lib/data/forecast-schema.js');

assert.strictEqual(typeof ForecastSchema, 'object');
assert.strictEqual(ForecastSchema.type, 'object');
assert.strictEqual(typeof ForecastSchema.properties, 'object');
assert.strictEqual(typeof ForecastSchema.properties.eventType, 'object');
assert.strictEqual(typeof ForecastSchema.properties.location, 'object');
assert.strictEqual(typeof ForecastSchema.properties.patternMatchId, 'object');
assert.strictEqual(typeof ForecastSchema.properties.speculative, 'object');

console.log('forecast schema test passed');
