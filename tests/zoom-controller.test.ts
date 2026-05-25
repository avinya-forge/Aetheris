import assert from 'assert';
import { isLayerVisible } from '../src/lib/zoom-controller';

try {
  assert.strictEqual(isLayerVisible('CLUSTERS', 1, 'zoom-controller.test.ts: strictEqual failure'), false, 'Clusters hidden at zoom 1');
  assert.strictEqual(isLayerVisible('CLUSTERS', 3, 'zoom-controller.test.ts: strictEqual failure'), true, 'Clusters visible at zoom 3');
  assert.strictEqual(isLayerVisible('EVENTS', 7, 'zoom-controller.test.ts: strictEqual failure'), false, 'Events hidden at zoom 7');
  assert.strictEqual(isLayerVisible('EVENTS', 9, 'zoom-controller.test.ts: strictEqual failure'), true, 'Events visible at zoom 9');
  assert.strictEqual(isLayerVisible('UNKNOWN', 10, 'zoom-controller.test.ts: strictEqual failure'), false, 'Unknown layer should be invisible');
  console.log('zoom-controller.test.js passed');
} catch (e) {
  console.error('zoom-controller.test.js failed:', e.message);
  process.exit(1);
}

export {};
