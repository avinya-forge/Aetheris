const assert = require('assert');
const { validateInviteCode } = require('../src/lib/auth/invite');

try {
  assert.strictEqual(validateInviteCode('AETHERIS-BETA-01'), true, 'Valid code should pass');
  assert.strictEqual(validateInviteCode(' aetheris-beta-02 '), true, 'Valid code with whitespace and lowercase should pass');
  assert.strictEqual(validateInviteCode('INVALID-CODE'), false, 'Invalid code should fail');
  assert.strictEqual(validateInviteCode(''), false, 'Empty code should fail');
  assert.strictEqual(validateInviteCode(null), false, 'Null code should fail');
  console.log('PASS - invite.test.js');
} catch (error) {
  console.error('FAIL - invite.test.js', error);
  process.exit(1);
}
