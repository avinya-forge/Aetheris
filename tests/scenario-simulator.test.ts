import assert from 'assert';
import { simulateScenarios } from '../lib/scenario-simulator.js';

const existingEvents = [
  { id: 'e1', topic: 'Weather', location: 'Paris', impactScore: 6 },
  { id: 'e2', topic: 'Politics', location: 'London', impactScore: 4 }
];

const forecasts = [
  { id: 'f1', eventType: 'Heatwave', topic: 'Weather', location: 'Paris', patternMatchId: 'H123', isSpeculative: false, impactScore: 7, sources: ['source1'] },
  { id: 'f2', eventType: 'Storm', topic: 'Weather', location: 'London', isSpeculative: true, impactScore: 8 }, // speculative, should be ignored
  { id: 'f3', eventType: 'Drought', topic: 'Environment', location: 'Rome', patternMatchId: 'D789', isSpeculative: false } // no impactScore, should default
];

// Test array validations
const emptyResult = simulateScenarios(existingEvents, null as any);
assert.deepStrictEqual(emptyResult, { simulatedCards: [], impacts: [] }, 'Should return empty structure on invalid forecasts');

// Test valid inputs
const result = simulateScenarios(existingEvents, forecasts);

assert.strictEqual(Array.isArray(result.simulatedCards), true, 'simulatedCards must be an array');
assert.strictEqual(result.simulatedCards.length, 2, 'Only 2 non-speculative forecasts should be simulated');

assert.strictEqual(Array.isArray(result.impacts), true, 'impacts must be an array');
assert.strictEqual(result.impacts.length, 2, 'There should be 2 causal chains identified');

const heatwaveImpact = result.impacts.find(i => i.causalChainId === 'H123');
assert.ok(heatwaveImpact, 'Heatwave impact cluster should exist');
// Heatwave base impact 7 + 1 related event (Paris/Weather) = 8
assert.strictEqual(heatwaveImpact.combinedImpact, 8, 'Impact score should be boosted by related existing events');

const droughtImpact = result.impacts.find(i => i.causalChainId === 'D789');
assert.ok(droughtImpact, 'Drought impact cluster should exist');
// Drought has no impact score, defaults to 5. 0 related events = 5
assert.strictEqual(droughtImpact.combinedImpact, 5, 'Default impact score should be applied');

// Test with empty existing events
const resultNoExisting = simulateScenarios([], forecasts);
const heatwaveImpactNoExisting = resultNoExisting.impacts.find(i => i.causalChainId === 'H123');
assert.strictEqual(heatwaveImpactNoExisting?.combinedImpact, 7, 'Impact score should remain base value if no existing events');

console.log('PASS - scenario-simulator.test.ts');
export {};
