const assert = require('assert');
const { ghostCardSchema } = require('../lib/schema/ghost-card.js');

try {
  assert.strictEqual(typeof ghostCardSchema, 'object', 'Must match expected value');
  assert.strictEqual(ghostCardSchema.type, 'object', 'Must match expected value');
} catch (err) {
  console.error('FAIL - ghost-card.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - ghost-card.test.js');
