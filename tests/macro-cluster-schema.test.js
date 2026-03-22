const assert = require('assert');
const schema = require('../lib/schema/macro-cluster');

try {
  assert.strictEqual(typeof schema, 'object');
  assert.strictEqual(schema.type, 'object');
  assert.strictEqual(typeof schema.properties, 'object');
  assert.strictEqual(schema.properties.clusterId.type, 'string');
  assert.strictEqual(schema.properties.theme.type, 'string');
  assert.strictEqual(schema.properties.events.type, 'array');
  assert.strictEqual(schema.properties.events.items.type, 'string');
  assert.strictEqual(schema.properties.impactScore.type, 'number');
  console.log('macro-cluster schema test passed');
} catch (error) {
  console.error('macro-cluster schema test failed:', error.message);
  process.exit(1);
}
