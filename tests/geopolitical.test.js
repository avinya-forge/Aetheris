const assert = require('assert');
const { geopoliticalSchema } = require('../lib/schema/geopolitical.js');

try {
  assert.strictEqual(typeof geopoliticalSchema, 'object', 'geopolitical.test.js: expected values to be strictly equal');
} catch (err) {
  console.error('FAIL - geopolitical.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - geopolitical.test.js');
