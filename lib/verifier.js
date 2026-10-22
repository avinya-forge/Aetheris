import crypto from 'node:crypto';

/**
 * Verifies a cryptographic signature (SHA256 HMAC) of a payload against a given secret.
 *
 * @param {string} payload - The raw payload string to verify.
 * @param {string} signature - The provided hex signature to check against.
 * @param {string} secret - The shared secret to use for the HMAC.
 * @returns {boolean} True if the signature is valid and matches, false otherwise.
 */
export function verifyPayloadSignature(payload, signature, secret) {
  if (!payload || !signature || !secret) {
    return false;
  }

  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');

    // Use timingSafeEqual to prevent timing attacks
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    const signatureBuffer = Buffer.from(signature, 'hex');

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch (err) {
    return false; // Safely return false on bad hex formatting or crypto errors
  }
}
