import assert from 'assert';
import { identifyClusters, identifyMacroClusters } from '../lib/cluster-identifier.js';

try {
  const events = [
    { id: '1', topic: 'Solar', impactScore: 10, timestamp: 1000 },
    { id: '2', topic: 'Solar', impactScore: 10, timestamp: 2000 },
    { id: '3', topic: 'Storm', impactScore: 5, timestamp: 1000 }
  ];

  const clusters = identifyClusters(events);
  assert.strictEqual(clusters.length, 2);
  assert.strictEqual(clusters[0].theme, 'Solar');
  assert.strictEqual(clusters[0].impactScore, 20);
  assert.strictEqual(clusters[0].earliest, 1000);
  assert.strictEqual(clusters[0].latest, 2000);

  const macro = identifyMacroClusters([
    { theme: 'Trend', earliest: 0, latest: 25 * 3600 * 1000 }
  ]);
  assert.strictEqual(macro.length, 1);

  console.log('PASS - cluster-identifier.test.js');
} catch (e: any) {
  console.error('FAIL - cluster-identifier.test.js:', e.message);
  process.exit(1);
}

export {};
