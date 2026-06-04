import assert from 'assert';
import { forecastSchema } from '../lib/forecast.js';

try {
  assert.strictEqual(typeof forecastSchema, 'object', 'forecast.test.js: value mismatch');
} catch (err: any) {
  console.error('FAIL - forecast.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - forecast.test.js');
