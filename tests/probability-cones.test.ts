import assert from 'assert';
import { generateGhostCards } from '../lib/probability-cones';

const forecasts = [
  { eventType: 'Heatwave', location: 'Paris', patternMatchId: 'H123', isSpeculative: false, sources: ['noaa-swpc', 'gdelt', 'nasa-donki'] },
  { eventType: 'Storm', location: 'London', isSpeculative: true },
  { eventType: 'Aurora', location: 'Iceland', patternMatchId: 'A456', isSpeculative: false, source: 'noaa-swpc' },
  { eventType: 'Drought', location: 'Rome', patternMatchId: 'D789', isSpeculative: false }
];

const result = generateGhostCards(forecasts);

assert.strictEqual(Array.isArray(result), true, 'probability-cones.test.ts: result must be an array');
assert.strictEqual(result.length, 3, 'probability-cones.test.ts: result length mismatch');

const heatwaveCard = result.find(r => r.eventDetails.eventType === 'Heatwave');
assert.ok(heatwaveCard, 'Heatwave card should exist');
assert.strictEqual(heatwaveCard.likelihood >= 0 && heatwaveCard.likelihood <= 0.95, true, 'probability-cones.test.ts: likelihood must be <= 0.95');
assert.strictEqual(heatwaveCard.isSpeculative, false, 'probability-cones.test.ts: isSpeculative mismatch');
assert.strictEqual(heatwaveCard.eventDetails.eventType, 'Heatwave', 'probability-cones.test.ts: eventType mismatch');
assert.strictEqual(heatwaveCard.eventDetails.location, 'Paris', 'probability-cones.test.ts: location mismatch');

// Verify diversity variance calculation
// Heatwave: base(70) + patternVariance(4*2=8) + diversityVariance(3*3=9) = 87
assert.strictEqual(heatwaveCard.likelihood, 0.87, 'probability-cones.test.ts: diversity likelihood calculation mismatch for multiple sources');

const auroraCard = result.find(r => r.eventDetails.eventType === 'Aurora');
// Aurora: base(70) + patternVariance(4*2=8) + diversityVariance(1*3=3) = 81
assert.strictEqual(auroraCard.likelihood, 0.81, 'probability-cones.test.ts: diversity likelihood calculation mismatch for single source');

const droughtCard = result.find(r => r.eventDetails.eventType === 'Drought');
// Drought: base(70) + patternVariance(4*2=8) + diversityVariance(0) = 78
assert.strictEqual(droughtCard.likelihood, 0.78, 'probability-cones.test.ts: diversity likelihood calculation mismatch for zero sources');

console.log('PASS - probability-cones.test.js');

export {};
