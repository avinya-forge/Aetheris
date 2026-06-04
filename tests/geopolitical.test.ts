import assert from 'assert';
import { geopoliticalSchema } from '../lib/geopolitical.js';

try {
  assert.strictEqual(typeof geopoliticalSchema, 'object', 'geopolitical.test.js: value mismatch');
} catch (err: any) {
  console.error('FAIL - geopolitical.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - geopolitical.test.js');
