const assert = require('assert');
const { getAtmosphereFromKp, ATMOSPHERE_MODES } = require('../src/lib/ui/chromodynamic');

try {
  assert.deepStrictEqual(getAtmosphereFromKp(1), ATMOSPHERE_MODES.CALM, 'Kp 1 should be CALM');
  assert.deepStrictEqual(getAtmosphereFromKp(5), ATMOSPHERE_MODES.ACTIVE, 'Kp 5 should be ACTIVE');
  assert.deepStrictEqual(getAtmosphereFromKp(9), ATMOSPHERE_MODES.STORM, 'Kp 9 should be STORM');
  console.log('chromodynamic.test.js passed');
} catch (e) {
  console.error('chromodynamic.test.js failed:', e.message);
  process.exit(1);
}

export {};
