// Source freshness ranker — pure logic, no I/O
// Tracks each source's natural update cadence and scores by how overdue it is.
// Sniffer calls rankSources() each cycle; only due sources are polled.

const SOURCE_BASE_INTERVALS_MS = {
  'noaa-swpc':  60_000,       // updates every 1 min (Kp-index telemetry)
  'gdelt':      900_000,      // updates every 15 min (global event articles)
  'nasa-donki': 1_800_000,    // updates every 30 min (space weather events)
  'open-meteo': 3_600_000,    // updates every 60 min (weather model cycle)
};

/**
 * Score a single source by how overdue it is for a poll.
 * @param {{ id: string, lastFetchedAt: number, consecutiveEmptyPolls?: number }} sourceMeta
 * @param {number} [now] - injectable for tests
 * @returns {{ id: string, due: boolean, priority: number }}
 */
function scoreSource(sourceMeta, now) {
  const interval = SOURCE_BASE_INTERVALS_MS[sourceMeta.id] || 900_000;

  // Exponential backoff for sources that have been consistently empty
  const backoffFactor = Math.min(Math.pow(2, sourceMeta.consecutiveEmptyPolls || 0), 8);
  const effectiveInterval = interval * backoffFactor;

  const timeSinceLast = now - (sourceMeta.lastFetchedAt || 0);
  const due = timeSinceLast >= effectiveInterval;
  const priority = due ? timeSinceLast / effectiveInterval : 0;

  return { id: sourceMeta.id, due, priority };
}

/**
 * Rank all sources by poll priority. Returns only sources that are due.
 * Most overdue (highest priority) first — ensures freshest data fetched first.
 * @param {Array<{ id: string, lastFetchedAt: number }>} sourcesMeta
 * @param {number} [now]
 * @returns {Array<{ id: string, due: boolean, priority: number }>}
 */
function rankSources(sourcesMeta, now) {
  return sourcesMeta
    .map(s => scoreSource(s, now))
    .filter(s => s.due)
    .sort((a, b) => b.priority - a.priority);
}

export { scoreSource, rankSources, SOURCE_BASE_INTERVALS_MS };

