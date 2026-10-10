import assert from 'assert';
import { simulateScenario } from '../lib/scenario-simulator.js';

const scenario = { id: 1, text: 'Test scenario' };

// Test 1: Null scenario
assert.strictEqual(simulateScenario(null), null, 'Should return null for null scenario');

// Test 2: Empty evaluators
const resultEmpty = simulateScenario(scenario, []);
assert.strictEqual(resultEmpty.score, 0, 'Should return 0 score for empty evaluators');
assert.strictEqual(resultEmpty.isVerified, false, 'Should not verify with empty evaluators');

// Test 3: Evaluators passing threshold
const passEvaluators = [
  () => 0.8,
  () => 0.9,
  () => 0.7
]; // average: 0.8
const resultPass = simulateScenario(scenario, passEvaluators);
assert.ok(Math.abs(resultPass.score - 0.8) < 0.0001, 'Average score should be 0.8');
assert.strictEqual(resultPass.isVerified, true, 'Should be verified when score >= 0.75');
assert.strictEqual(resultPass.scenario.id, 1, 'Should return the scenario');

// Test 4: Evaluators failing threshold
const failEvaluators = [
  () => 0.6,
  () => 0.8,
  () => 0.7
]; // average: 0.7
const resultFail = simulateScenario(scenario, failEvaluators);
assert.ok(Math.abs(resultFail.score - 0.7) < 0.0001, 'Average score should be 0.7');
assert.strictEqual(resultFail.isVerified, false, 'Should not be verified when score < 0.75');

// Test 5: Evaluator throws error
const errorEvaluators = [
  () => { throw new Error('evaluator failed'); },
  () => 1.0
]; // average: 0.5
const resultError = simulateScenario(scenario, errorEvaluators);
assert.strictEqual(resultError.score, 0.5, 'Average score should be 0.5 when one fails (returns 0)');
assert.strictEqual(resultError.isVerified, false, 'Should not be verified');

// Test 6: Evaluator returns non-number
const badEvaluators = [
  () => 'not a number',
  () => 1.0
]; // average: 0.5
const resultBad = simulateScenario(scenario, badEvaluators);
assert.strictEqual(resultBad.score, 0.5, 'Average score should be 0.5 when one returns non-number');
assert.strictEqual(resultBad.isVerified, false, 'Should not be verified');

console.log('PASS - scenario-simulator.test.js');

export {};