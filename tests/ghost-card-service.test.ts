import assert from 'assert';
import { getGhostCards } from '../src/lib/ghost-card-service';

const originalFetch = globalThis.fetch;

(async () => {
  try {
    // Test 1: Fetch Error / Fallback
    (globalThis as any).fetch = (async () => { throw new Error('Network Error'); });
    const cards = await getGhostCards();
    assert.strictEqual(cards.length, 2, 'Should return mock cards on fetch error');

    // Test 2: Successful Fetch
    (globalThis as any).fetch = (async () => ({
      ok: true,
      json: async () => [{ id: 'api-g1', title: 'API Ghost', likelihood: 0.9, isSpeculative: false }]
    }));
    const apiCards = await getGhostCards();
    assert.strictEqual(apiCards.length, 1, 'Should return ghost cards from API');
    assert.strictEqual(apiCards[0].id, 'api-g1');

    globalThis.fetch = originalFetch;
    console.log('PASS - ghost-card-service.test.js');
  } catch (e: any) {
    console.error('ghost-card-service.test.js failed:', e.message);
    process.exit(1);
  }
})();

export {};
