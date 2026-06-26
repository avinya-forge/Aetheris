import assert from 'assert';
import { getGhostCards } from '../src/lib/ghost-card-service';

(async () => {
  try {
    const cards = await getGhostCards();
    assert.strictEqual(cards.length, 2, 'Should return 2 ghost cards');
    assert.ok(cards.every(c => c.likelihood <= 0.95), 'All likelihoods should be <= 95%');
    assert.ok(cards.every(c => c.isSpeculative === false), 'All ghost cards must NOT be speculative per vision');

    console.log('PASS - ghost-card-service.test.js');
  } catch (e: any) {
    console.error('ghost-card-service.test.js failed:', e.message);
    process.exit(1);
  }
})();

export {};
