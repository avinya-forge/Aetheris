import assert from 'assert';
import { validateInviteCode } from '../src/lib/invite';

try {
  assert.strictEqual(validateInviteCode('AETHERIS-BETA-01', 'invite.test.ts: strictEqual failure'), true, 'Valid code should pass');
  assert.strictEqual(validateInviteCode(' aetheris-beta-02 ', 'invite.test.ts: strictEqual failure'), true, 'Valid code with whitespace and lowercase should pass');
  assert.strictEqual(validateInviteCode('INVALID-CODE', 'invite.test.ts: strictEqual failure'), false, 'Invalid code should fail');
  assert.strictEqual(validateInviteCode('', 'invite.test.ts: strictEqual failure'), false, 'Empty code should fail');
  assert.strictEqual(validateInviteCode(null, 'invite.test.ts: strictEqual failure'), false, 'Null code should fail');
  console.log('PASS - invite.test.js');
} catch (error) {
  console.error('FAIL - invite.test.js', error);
  process.exit(1);
}

export {};
