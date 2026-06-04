import assert from 'assert';
import { nowcastSchema } from '../lib/nowcast.js';

try {
  assert.strictEqual(typeof nowcastSchema, 'object', 'nowcast.test.js: value mismatch');
} catch (err: any) {
  console.error('FAIL - nowcast.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - nowcast.test.js');
