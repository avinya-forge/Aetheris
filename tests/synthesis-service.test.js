const assert = require('assert');
const { getSynthesis } = require('../src/lib/services/synthesis-service.js');

try {
  const result = getSynthesis('c1');
  assert.strictEqual(result.id, 'c1', 'Should return correct cluster ID');
  assert.ok(result.brief.length <= 30 * 6, 'Brief should be concise');
  console.log('PASS - synthesis-service.test.js');
} catch (e) {
  console.error('synthesis-service.test.js failed:', e.message);
  process.exit(1);
}
