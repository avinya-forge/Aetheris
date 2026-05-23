const assert = require('assert');
const { ghostCardSchema } = require('../lib/schema/ghost-card');

try {
  assert.strictEqual(typeof ghostCardSchema, 'object', 'ghost-card.test.js: value mismatch');
  assert.strictEqual(ghostCardSchema.type, 'object', 'ghost-card.test.js: value mismatch');
} catch (err) {
  console.error('FAIL - ghost-card.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - ghost-card.test.js');

export {};
