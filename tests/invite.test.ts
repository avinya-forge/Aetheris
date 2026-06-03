import assert from 'assert';
import { validateInviteCode } from '../src/lib/invite';

try {
  assert.strictEqual(validateInviteCode('AETHERIS-BETA-01'), true, 'Valid code should pass');
  assert.strictEqual(validateInviteCode(' aetheris-beta-02 '), true, 'Valid code with whitespace and lowercase should pass');
  assert.strictEqual(validateInviteCode('INVALID-CODE'), false, 'Invalid code should fail');
  assert.strictEqual(validateInviteCode(''), false, 'Empty code should fail');
  assert.strictEqual(validateInviteCode(null as any), false, 'Null code should fail');

  console.log('PASS - invite.test.js');
} catch (e: any) {
  console.error('FAIL - invite.test.js:', e.message);
  process.exit(1);
}

export {};
