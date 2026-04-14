const assert = require('assert');
const { ForecastSchema } = require('../lib/schema/forecast.js');

assert.strictEqual(ForecastSchema.type, 'object', 'ForecastSchema must be an object type');
assert.ok(ForecastSchema.properties, 'ForecastSchema must have properties');
console.log('forecast schema test passed');
