import assert from 'assert';
import { summarySchema } from '../lib/summary.js';

try {
  assert.strictEqual(typeof summarySchema, 'object', 'summary.test.js: value mismatch');
} catch (err: any) {
  console.error('FAIL - summary.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - summary.test.js');
