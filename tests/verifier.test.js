import assert from 'assert';
import crypto from 'node:crypto';
import { verifyPayloadSignature } from '../lib/verifier.js';

function runTests() {
  const secret = 'my-super-secret-key';
  const payload = JSON.stringify({ event: 'solar-flare', magnitude: 9.5 });

  // Create valid signature
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const validSignature = hmac.digest('hex');

  // Test 1: Valid signature
  assert.strictEqual(
    verifyPayloadSignature(payload, validSignature, secret),
    true,
    'Should return true for a valid signature'
  );

  // Test 2: Invalid signature (different payload)
  const invalidPayload = JSON.stringify({ event: 'solar-flare', magnitude: 9.6 });
  assert.strictEqual(
    verifyPayloadSignature(invalidPayload, validSignature, secret),
    false,
    'Should return false for a mismatched payload'
  );

  // Test 3: Invalid signature (wrong secret)
  const wrongSecret = 'wrong-secret';
  const hmacWrong = crypto.createHmac('sha256', wrongSecret);
  hmacWrong.update(payload);
  const invalidSignature = hmacWrong.digest('hex');

  assert.strictEqual(
    verifyPayloadSignature(payload, invalidSignature, secret),
    false,
    'Should return false for a signature generated with the wrong secret'
  );

  // Test 4: Missing arguments
  assert.strictEqual(verifyPayloadSignature(null, validSignature, secret), false, 'Should handle missing payload');
  assert.strictEqual(verifyPayloadSignature(payload, null, secret), false, 'Should handle missing signature');
  assert.strictEqual(verifyPayloadSignature(payload, validSignature, null), false, 'Should handle missing secret');

  // Test 5: Malformed hex string signature
  assert.strictEqual(verifyPayloadSignature(payload, 'not-a-hex-string', secret), false, 'Should handle malformed signature strings safely');

  console.log('PASS - verifier.test.js');
}

runTests();
