import assert from 'assert';
import { scoreSource, rankSources, SOURCE_BASE_INTERVALS_MS } from '../lib/source-ranker';

try {
  const NOW = 1_000_000_000_000;

  // --- scoreSource ---
  // Source never fetched → overdue by infinite ratio → due
  const never = scoreSource({ id: 'gdelt', lastFetchedAt: 0 }, NOW);
  assert.strictEqual(never.due, true, 'never-fetched source must be due');
  assert.ok(never.priority > 1, 'never-fetched source must have priority > 1');

  // Source just fetched → not due
  const fresh = scoreSource({ id: 'noaa-swpc', lastFetchedAt: NOW - 10_000 }, NOW);
  assert.strictEqual(fresh.due, false, 'just-fetched source must not be due');
  assert.strictEqual(fresh.priority, 0, 'not-due source must have priority 0');

  // Source exactly at boundary → due
  const atBoundary = scoreSource(
    { id: 'noaa-swpc', lastFetchedAt: NOW - SOURCE_BASE_INTERVALS_MS['noaa-swpc'] },
    NOW
  );
  assert.strictEqual(atBoundary.due, true, 'source at interval boundary must be due');

  // Exponential backoff: 3 consecutive empty polls → interval * 8 (capped)
  const backedOff = scoreSource(
    { id: 'noaa-swpc', lastFetchedAt: NOW - SOURCE_BASE_INTERVALS_MS['noaa-swpc'] * 4, consecutiveEmptyPolls: 3 },
    NOW
  );
  assert.strictEqual(backedOff.due, false, 'source under backoff must not be due early');

  // --- rankSources ---
  const meta = [
    { id: 'noaa-swpc',  lastFetchedAt: NOW - 120_000 },   // 2min ago — 2.0× overdue (60s interval)
    { id: 'gdelt',       lastFetchedAt: NOW - 1_000_000 }, // ~17min ago — 1.11× overdue (15min interval)
    { id: 'nasa-donki', lastFetchedAt: NOW - 60_000 },    // 1min ago — NOT due (30min interval)
    { id: 'open-meteo', lastFetchedAt: NOW - 200_000 },   // ~3min ago — NOT due (60min interval)
  ];

  const ranked = rankSources(meta, NOW);
  assert.strictEqual(ranked.length, 2, 'only due sources returned');
  // noaa-swpc is 2.0× overdue vs gdelt 1.11× → noaa-swpc has higher priority
  assert.strictEqual(ranked[0].id, 'noaa-swpc', 'noaa-swpc more overdue (2.0×) → first in rank');
  assert.strictEqual(ranked[1].id, 'gdelt', 'gdelt second (1.11× overdue)');

  // Empty list → empty result
  assert.deepStrictEqual(rankSources([], NOW, 'source-ranker.test.ts: deepStrictEqual failure'), [], 'empty meta → empty rank');

} catch (err) {
  console.error('FAIL - source-ranker.test.js:', err.message);
  process.exit(1);
}
console.log('PASS - source-ranker.test.js');

export {};
