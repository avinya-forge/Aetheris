const assert = require('assert');
const { MacroClusterSchema } = require('../lib/schema/macro-cluster');

try {
  assert.strictEqual(typeof MacroClusterSchema, 'object', 'MacroClusterSchema must be an object');
  assert.strictEqual(MacroClusterSchema.type, 'object', 'root type must be object');
  assert.strictEqual(typeof MacroClusterSchema.properties, 'object', 'properties must exist');
  assert.strictEqual(MacroClusterSchema.properties.clusterId.type, 'string', 'clusterId must be string');
  assert.strictEqual(MacroClusterSchema.properties.theme.type, 'string', 'theme must be string');
  assert.strictEqual(MacroClusterSchema.properties.events.type, 'array', 'events must be array');
  assert.strictEqual(MacroClusterSchema.properties.events.items.type, 'string', 'events items must be string');
  assert.strictEqual(MacroClusterSchema.properties.impactScore.type, 'number', 'impactScore must be number');
  console.log('macro-cluster schema test passed');
} catch (error) {
  console.error('macro-cluster schema test failed:', error.message);
  process.exit(1);
}
