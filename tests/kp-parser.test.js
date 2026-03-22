const assert = require('assert');
const parseKpIndex = require('../lib/data/kp-parser');

try {
  const highData = { kp_index: "6" };
  const highResult = parseKpIndex(highData);
  assert.strictEqual(highResult.value, 6);
  assert.strictEqual(highResult.alert, true);

  const lowData = { kp_index: "3" };
  const lowResult = parseKpIndex(lowData);
  assert.strictEqual(lowResult.value, 3);
  assert.strictEqual(lowResult.alert, false);

  const emptyResult = parseKpIndex({});
  assert.strictEqual(emptyResult, null);

  console.log('kp parser test passed');
} catch (error) {
  console.error('kp parser test failed:', error.message);
  process.exit(1);
}
