/**
 * Evaluates whether an anomaly should be flagged based on multi-agent consensus.
 * Requires at least 3 distinct sensors to agree to flag an anomaly.
 *
 * @param {Array<{ sensorId: string, flag: boolean }>} reports - Array of sensor reports
 * @returns {boolean} True if consensus is reached, false otherwise
 */
export function evaluateConsensus(reports) {
  if (!Array.isArray(reports)) return false;

  const flaggingSensors = new Set();

  for (const report of reports) {
    if (report && report.sensorId && report.flag === true) {
      flaggingSensors.add(report.sensorId);
    }
  }

  return flaggingSensors.size >= 3;
}
