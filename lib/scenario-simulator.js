/**
 * Simulates scenarios using JEV (Joint Evaluation & Verification) logic.
 *
 * @param {Object} scenario - The scenario to evaluate
 * @param {Array<Function>} evaluators - Array of evaluator functions that return a confidence score (0-1)
 * @returns {Object} Evaluation result containing the scenario, average score, and verification status.
 */
export function simulateScenario(scenario, evaluators = []) {
  if (!scenario) return null;
  if (!Array.isArray(evaluators) || evaluators.length === 0) {
    return {
      scenario,
      score: 0,
      isVerified: false,
    };
  }

  const scores = evaluators.map(evaluator => {
    try {
      const score = evaluator(scenario);
      return typeof score === 'number' && !isNaN(score) ? score : 0;
    } catch {
      return 0;
    }
  });

  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / evaluators.length;

  return {
    scenario,
    score: averageScore,
    isVerified: averageScore >= 0.75,
  };
}
