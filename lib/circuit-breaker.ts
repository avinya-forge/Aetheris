// Circuit Breaker — pure logic for determining source availability
// I/O: SourceId, ErrorCount -> State
// Assert: opens after 5 fails, closes after 60s

/**
 * Determine the circuit breaker state for a source.
 * @param {string} sourceId
 * @param {number} errorCount - Number of consecutive errors
 * @param {number} lastErrorTime - Timestamp of the last error
 * @param {number} [now] - Current time for testing
 * @returns {{ isOpen: boolean, retryAfter: number }}
 */
function getCircuitState(sourceId, errorCount, lastErrorTime, now) {
  const MAX_ERRORS = 5;
  const COOLOFF_PERIOD_MS = 60_000; // 60 seconds

  if (errorCount >= MAX_ERRORS) {
    const timeSinceError = now - (lastErrorTime || 0);
    if (timeSinceError < COOLOFF_PERIOD_MS) {
      return { isOpen: true, retryAfter: COOLOFF_PERIOD_MS - timeSinceError };
    }
  }

  return { isOpen: false, retryAfter: 0 };
}

module.exports = { getCircuitState };

export {};
