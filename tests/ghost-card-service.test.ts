import assert from 'assert';
import { getGhostCards } from '../src/lib/ghost-card-service';

try {
  const cards = getGhostCards();
  assert.strictEqual(cards.length, 2, 'Should return 2 ghost cards');
  assert.ok(cards.every(c => c.likelihood <= 0.95), 'All likelihoods should be <= 95%');
  assert.ok(cards.every(c => c.isSpeculative === true), 'All ghost cards must be speculative');

  console.log('PASS - ghost-card-service.test.js');
} catch (e: any) {
  console.error('ghost-card-service.test.js failed:', e.message);
  process.exit(1);
}

export {};
