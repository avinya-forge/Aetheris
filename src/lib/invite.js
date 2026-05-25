/**
 * Invite Gate logic
 */

const ALLOWLIST_CODES = [
  'AETHERIS-BETA-01',
  'AETHERIS-BETA-02',
  'PIONEER-ACCESS'
];

/**
 * Validates if an invite code is accepted.
 * @param {string} code
 * @returns {boolean}
 */
const validateInviteCode = (code) => {
  if (!code || typeof code !== 'string') return false;
  return ALLOWLIST_CODES.includes(code.trim().toUpperCase());
};

module.exports = { validateInviteCode, ALLOWLIST_CODES };
