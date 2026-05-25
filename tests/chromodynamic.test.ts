import assert from 'assert';
import { getAtmosphereFromKp, ATMOSPHERE_MODES } from '../src/lib/chromodynamic';

try {
  assert.deepStrictEqual(getAtmosphereFromKp(1, 'chromodynamic.test.ts: deepStrictEqual failure'), ATMOSPHERE_MODES.CALM, 'Kp 1 should be CALM');
  assert.deepStrictEqual(getAtmosphereFromKp(5, 'chromodynamic.test.ts: deepStrictEqual failure'), ATMOSPHERE_MODES.ACTIVE, 'Kp 5 should be ACTIVE');
  assert.deepStrictEqual(getAtmosphereFromKp(9, 'chromodynamic.test.ts: deepStrictEqual failure'), ATMOSPHERE_MODES.STORM, 'Kp 9 should be STORM');
  console.log('chromodynamic.test.js passed');
} catch (e) {
  console.error('chromodynamic.test.js failed:', e.message);
  process.exit(1);
}

export {};
