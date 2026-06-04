import assert from 'assert';
import { summary24hSchema } from '../lib/24h-summary.js';

try {
  assert.strictEqual(typeof summary24hSchema, 'object', '24h-summary.test.js: value mismatch');
} catch (err: any) {
  console.error('FAIL - 24h-summary.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - 24h-summary.test.js');
