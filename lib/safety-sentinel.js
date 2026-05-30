const { evaluateHazard } = require('./hazard-evaluator');

/**
 * Evaluates a single environmental data object for hazards
 * and returns the resulting warning as a string.
 *
 * @param {Object} environmentalData - Environmental data object to check
 * @returns {string} The injected safety warning or an empty string.
 */
function injectSafetyWarning(environmentalData) {
  if (!environmentalData || typeof environmentalData !== 'object') return '';

  const warning = evaluateHazard(environmentalData);
  return warning || '';
}

module.exports = { injectSafetyWarning };

export {};
