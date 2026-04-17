const assert = require('assert');
const { ClusterSchema } = require('../lib/schema/cluster.js');

try {
  assert.strictEqual(ClusterSchema.type, 'object', 'ClusterSchema should be of type object');
  assert.ok(ClusterSchema.properties, 'ClusterSchema should have properties defined');
  assert.ok(ClusterSchema.properties.id, 'ClusterSchema should define an id property');
  assert.ok(ClusterSchema.properties.keywords, 'ClusterSchema should define a keywords property');
  assert.strictEqual(ClusterSchema.properties.keywords.type, 'array', 'keywords should be an array');
  assert.ok(ClusterSchema.properties.events, 'ClusterSchema should define an events property');
  assert.strictEqual(ClusterSchema.properties.events.type, 'array', 'events should be an array');
  console.log('PASS - cluster.test.js');
} catch (error) {
  console.error('FAIL - cluster.test.js:', error.message);
  process.exit(1);
}
