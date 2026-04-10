const assert = require('assert');
const { parseKpIndex } = require('../lib/data/kp-parser.js');

try {
  const normalResult = parseKpIndex({ kp_index: 3 });
  assert.strictEqual(normalResult.alert, false, 'kp_index 3 should not trigger an alert');
  assert.strictEqual(normalResult.severity, 'LOW', 'kp_index 3 severity should be LOW');

  const moderateResult = parseKpIndex({ kp_index: 5 });
  assert.strictEqual(moderateResult.alert, true, 'kp_index 5 should trigger an alert');
  assert.strictEqual(moderateResult.severity, 'MODERATE', 'kp_index 5 severity should be MODERATE');

  const highResult = parseKpIndex({ kp_index: 7 });
  assert.strictEqual(highResult.alert, true, 'kp_index 7 should trigger an alert');
  assert.strictEqual(highResult.severity, 'HIGH', 'kp_index 7 severity should be HIGH');

  const extremeResult = parseKpIndex({ kp_index: 9 });
  assert.strictEqual(extremeResult.alert, true, 'kp_index 9 should trigger an alert');
  assert.strictEqual(extremeResult.severity, 'EXTREME', 'kp_index 9 severity should be EXTREME');

  const stringResult = parseKpIndex({ kp_index: "6" });
  assert.strictEqual(stringResult.value, 6, 'string parsing should return parsed value');
  assert.strictEqual(stringResult.alert, true, 'string parsing should trigger an alert');
  assert.strictEqual(stringResult.severity, 'HIGH', 'string parsing should evaluate severity');

  console.log('PASS - kp-parser.test.js');
} catch (error) {
  console.error('FAIL - kp-parser.test.js:', error.message);
  process.exit(1);
}
