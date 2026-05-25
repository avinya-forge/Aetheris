import assert from 'assert';
import { getGhostCards } from '../src/lib/ghost-card-service';

try {
  const cards = getGhostCards();
  assert.strictEqual(cards.length, 2, 'Should return 2 ghost cards');
  assert.ok(cards.every(c => c.likelihood <= 0.95, 'ghost-card-service.test.ts: ok failure'), 'Likelihood should be <= 95%');
  console.log('PASS - ghost-card-service.test.js');
} catch (e) {
  console.error('ghost-card-service.test.js failed:', e.message);
  process.exit(1);
}

export {};
