const assert = require('assert');
const { clusterSchema } = require('../lib/schema/cluster');

try {
  assert.strictEqual(clusterSchema.type, 'object', 'clusterSchema should be of type object');
} catch (err) {
  console.error('FAIL - cluster.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - cluster.test.js');

export {};
