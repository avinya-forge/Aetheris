import assert from 'assert';
import { macroClusterSchema } from '../lib/macro-cluster.js';

try {
  assert.strictEqual(typeof macroClusterSchema, 'object', 'macro-cluster.test.js: value mismatch');
} catch (err: any) {
  console.error('FAIL - macro-cluster.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - macro-cluster.test.js');
