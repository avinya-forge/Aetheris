import assert from 'assert';
import { nowcastSchema } from '../lib/nowcast';

try {
  assert.strictEqual(typeof nowcastSchema, 'object', 'nowcast.test.js: value mismatch');
  assert.strictEqual(nowcastSchema.type, 'object', 'nowcast.test.js: value mismatch');
} catch (err) {
  console.error('FAIL - nowcast.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - nowcast.test.js');

export {};
