import assert from 'assert';
import { validateEvent } from '../lib/schema-validator';

try {
  assert.strictEqual(validateEvent(null, 'schema-validator.test.ts: strictEqual failure'), false, 'Should reject null');
  assert.strictEqual(validateEvent({}, 'schema-validator.test.ts: strictEqual failure'), false, 'Should reject empty object');
  assert.strictEqual(validateEvent({ id: '123' }, 'schema-validator.test.ts: strictEqual failure'), false, 'Should reject missing timestamp');
  assert.strictEqual(validateEvent({ id: '123', timestamp: 1713600000000 }, 'schema-validator.test.ts: strictEqual failure'), true, 'Should accept valid event');
} catch (error) {
  console.error('schema-validator test failed:', error.message);
  process.exit(1);
}
console.log('PASS - schema-validator.test.js');

export {};
