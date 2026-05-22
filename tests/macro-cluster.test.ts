const assert = require('assert');
const { macroClusterSchema } = require('../lib/schema/macro-cluster');

try {
  assert.strictEqual(typeof macroClusterSchema, 'object', 'macroClusterSchema must be an object');
  assert.strictEqual(macroClusterSchema.type, 'object', 'root type must be object');
} catch (err) {
  console.error('FAIL - macro-cluster.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - macro-cluster.test.js');

export {};
