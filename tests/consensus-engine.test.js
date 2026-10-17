import test from 'node:test';
import assert from 'node:assert';
import { evaluateConsensus } from '../lib/consensus-engine.js';

test('evaluateConsensus - returns false for non-array input', () => {
  assert.strictEqual(evaluateConsensus(null), false);
  assert.strictEqual(evaluateConsensus({}), false);
  assert.strictEqual(evaluateConsensus('not array'), false);
});

test('evaluateConsensus - returns false for empty array', () => {
  assert.strictEqual(evaluateConsensus([]), false);
});

test('evaluateConsensus - returns false for less than 3 sensors flagging', () => {
  const reports = [
    { sensorId: 'sensor-1', flag: true },
    { sensorId: 'sensor-2', flag: true },
    { sensorId: 'sensor-3', flag: false }
  ];
  assert.strictEqual(evaluateConsensus(reports), false);
});

test('evaluateConsensus - returns true for exactly 3 distinct sensors flagging', () => {
  const reports = [
    { sensorId: 'sensor-1', flag: true },
    { sensorId: 'sensor-2', flag: true },
    { sensorId: 'sensor-3', flag: true }
  ];
  assert.strictEqual(evaluateConsensus(reports), true);
});

test('evaluateConsensus - returns false for 3 flags from same sensor', () => {
  const reports = [
    { sensorId: 'sensor-1', flag: true },
    { sensorId: 'sensor-1', flag: true },
    { sensorId: 'sensor-1', flag: true }
  ];
  assert.strictEqual(evaluateConsensus(reports), false);
});

test('evaluateConsensus - returns true for more than 3 distinct sensors flagging', () => {
  const reports = [
    { sensorId: 'sensor-1', flag: true },
    { sensorId: 'sensor-2', flag: true },
    { sensorId: 'sensor-3', flag: true },
    { sensorId: 'sensor-4', flag: true }
  ];
  assert.strictEqual(evaluateConsensus(reports), true);
});

test('evaluateConsensus - handles invalid report structures safely', () => {
  const reports = [
    null,
    {},
    { flag: true },
    { sensorId: 'sensor-1', flag: 'true' }, // invalid flag type
    { sensorId: 'sensor-2', flag: true },
    { sensorId: 'sensor-3', flag: true },
    { sensorId: 'sensor-4', flag: true }
  ];
  assert.strictEqual(evaluateConsensus(reports), true);
});
