const assert = require('assert');
const { forecastSchema } = require('../lib/schema/forecast.js');

try {
  assert.strictEqual(forecastSchema.type, 'object', 'forecastSchema must be an object type');
} catch (err) {
  console.error('FAIL - forecast.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - forecast.test.js');
