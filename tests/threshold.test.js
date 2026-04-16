const assert = require('assert');
const { interestThresholdSchema } = require('../lib/schema/threshold.js');

try {
  assert.strictEqual(interestThresholdSchema.type, 'object', 'interestThresholdSchema must be an object type');
} catch (err) {
  console.error('FAIL - threshold.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - threshold.test.js');
