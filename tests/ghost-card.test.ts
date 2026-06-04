import assert from 'assert';
import { ghostCardSchema } from '../lib/ghost-card.js';

try {
  assert.strictEqual(typeof ghostCardSchema, 'object', 'ghost-card.test.js: value mismatch');
} catch (err: any) {
  console.error('FAIL - ghost-card.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - ghost-card.test.js');
