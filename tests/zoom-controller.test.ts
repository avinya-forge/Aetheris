const assert = require('assert');
const { isLayerVisible } = require('../src/lib/ui/zoom-controller');

try {
  assert.strictEqual(isLayerVisible('CLUSTERS', 1), false, 'Clusters hidden at zoom 1');
  assert.strictEqual(isLayerVisible('CLUSTERS', 3), true, 'Clusters visible at zoom 3');
  assert.strictEqual(isLayerVisible('EVENTS', 7), false, 'Events hidden at zoom 7');
  assert.strictEqual(isLayerVisible('EVENTS', 9), true, 'Events visible at zoom 9');
  assert.strictEqual(isLayerVisible('UNKNOWN', 10), false, 'Unknown layer should be invisible');
  console.log('zoom-controller.test.js passed');
} catch (e) {
  console.error('zoom-controller.test.js failed:', e.message);
  process.exit(1);
}

export {};
