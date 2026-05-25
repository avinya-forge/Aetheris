import assert from 'assert';
import { geopoliticalSchema } from '../lib/geopolitical';

try {
  assert.strictEqual(typeof geopoliticalSchema, 'object', 'geopolitical.test.js: value mismatch');
} catch (err) {
  console.error('FAIL - geopolitical.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - geopolitical.test.js');

export {};
