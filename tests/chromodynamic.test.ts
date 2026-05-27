import assert from 'assert';
import { getAtmosphereFromKp, ATMOSPHERE_MODES } from '../src/lib/chromodynamic';

try {
  assert.deepStrictEqual(getAtmosphereFromKp(1), ATMOSPHERE_MODES.CALM, 'Kp 1 should be CALM');
  assert.deepStrictEqual(getAtmosphereFromKp(5), ATMOSPHERE_MODES.ACTIVE, 'Kp 5 should be ACTIVE');
  assert.deepStrictEqual(getAtmosphereFromKp(9), ATMOSPHERE_MODES.STORM, 'Kp 9 should be STORM');

  assert.throws(
    () => getAtmosphereFromKp(-1),
    /Kp-index must be between 0 and 9/,
    'Should throw error for negative Kp-index'
  );

  assert.throws(
    () => getAtmosphereFromKp(10),
    /Kp-index must be between 0 and 9/,
    'Should throw error for out-of-bounds Kp-index (>9)'
  );

  console.log('chromodynamic.test.js passed');
} catch (e: any) {
  console.error('chromodynamic.test.js failed:', e.message);
  process.exit(1);
}

export {};
