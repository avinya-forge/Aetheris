import assert from 'assert';
import { interestThresholdSchema } from '../lib/threshold.js';

try {
  assert.strictEqual(typeof interestThresholdSchema, 'object', 'threshold.test.js: value mismatch');
} catch (err: any) {
  console.error('FAIL - threshold.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - threshold.test.js');
