import { evaluateHazard } from './hazard-evaluator.js';

/**
 * Evaluates environmental data for hazards and returns a warning string.
 * @param {Object} environmentalData
 * @returns {string}
 */
export function injectSafetyWarning(environmentalData) {
  if (!environmentalData || typeof environmentalData !== 'object') return '';
  return evaluateHazard(environmentalData) || '';
}
