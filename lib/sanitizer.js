/**
 * Core sanitization module to prevent XSS and ensure strict input handling
 * according to OWASP guidelines.
 */

export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
