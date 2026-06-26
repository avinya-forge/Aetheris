import assert from 'assert';
import { detectGeopoliticalShifts } from '../lib/data/shift-detector.js';

try {
  const historical = new Array(7).fill({});
  const current = new Array(3).fill({});

  const shifts = detectGeopoliticalShifts(historical, current);
  assert.strictEqual(shifts.length, 1);
  assert.strictEqual(shifts[0].type, 'GEOPOLITICAL_SHIFT');

  const noShifts = detectGeopoliticalShifts(historical, historical.slice(0, 1));
  assert.strictEqual(noShifts.length, 0);

  console.log('PASS - shift-detector.test.js');
} catch (e: any) {
  console.error('FAIL - shift-detector.test.js:', e.message);
  process.exit(1);
}

export {};
