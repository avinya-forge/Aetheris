const assert = require('assert');
const { geopoliticalSchema } = require('../lib/schema/geopolitical.js');

try {
  assert.strictEqual(typeof geopoliticalSchema, 'object', 'Must match expected value');
} catch (err) {
  console.error('FAIL - geopolitical.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - geopolitical.test.js');
