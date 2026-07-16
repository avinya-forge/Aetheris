import assert from 'assert';
import { identifyClusters, identifyMacroClusters, identifyHorizonImpacts } from '../lib/cluster-identifier.js';

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

  // Test identifyHorizonImpacts
  const horizonEvents = [
    { id: 'h1', isSpeculative: false, patternMatchId: 'chain-1', impactScore: 10, likelihood: 80 },
    { id: 'h2', isSpeculative: false, patternMatchId: 'chain-1', impactScore: 5, likelihood: 60 },
    { id: 'h3', isSpeculative: true, patternMatchId: 'chain-2', impactScore: 20, likelihood: 50 }, // Should be skipped
    { id: 'h4', isSpeculative: false, impactScore: 10, likelihood: 90 }, // Missing patternMatchId, skipped
    { id: 'h5', isSpeculative: false, patternMatchId: 'chain-2', impactScore: 15, likelihood: 90 }
  ];

  const horizonClusters = identifyHorizonImpacts(horizonEvents);
  assert.strictEqual(horizonClusters.length, 2);

  const chain1 = horizonClusters.find(c => c.causalChainId === 'chain-1');
  assert(chain1);
  assert.strictEqual(chain1.combinedImpact, 15);
  assert.strictEqual(chain1.averageLikelihood, 70);
  assert.deepStrictEqual(chain1.events, ['h1', 'h2']);

  const chain2 = horizonClusters.find(c => c.causalChainId === 'chain-2');
  assert(chain2);
  assert.strictEqual(chain2.combinedImpact, 15);
  assert.strictEqual(chain2.averageLikelihood, 90);
  assert.deepStrictEqual(chain2.events, ['h5']);

  const horizonEdge1 = identifyHorizonImpacts([{ isSpeculative: false, patternMatchId: 'chain-3' }]);
  assert.strictEqual(horizonEdge1.length, 1);
  assert.strictEqual(horizonEdge1[0].averageLikelihood, 0);

  const emptyHorizon = identifyHorizonImpacts(null as any);
  assert.deepStrictEqual(emptyHorizon, []);

  console.log('PASS - cluster-identifier.test.js');
} catch (e: any) {
  console.error('FAIL - cluster-identifier.test.js:', e.message);
  process.exit(1);
}

export {};
