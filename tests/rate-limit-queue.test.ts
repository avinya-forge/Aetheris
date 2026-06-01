import assert from 'assert';
const {
  windowKey,
  checkAndIncrementRate,
  createRateLimitedSynthesizer,
  MAX_REQUESTS_PER_MINUTE,
  KV_RATE_PREFIX,
} = require('../lib/rate-limit-queue');

(async () => {
  try {
    const NOW = 1_000_000_080_000; // anchored at exact UTC minute boundary (÷60000 = integer)

    // windowKey: same minute → same key
    const k1 = windowKey(NOW);
    const k2 = windowKey(NOW + 30_000); // +30s, same minute
    assert.strictEqual(k1, k2, 'same minute must produce same window key');

    // windowKey: different minute → different key
    const k3 = windowKey(NOW + 60_000); // +60s, next minute
    assert.notStrictEqual(k1, k3, 'different minute must produce different window key');

    // windowKey: uses KV_RATE_PREFIX
    assert.ok(k1.startsWith(KV_RATE_PREFIX, 'rate-limit-queue.test.ts: ok failure'), 'window key must start with KV_RATE_PREFIX');

    // checkAndIncrementRate: allow up to MAX_REQUESTS_PER_MINUTE
    const store = {};
    const mockKv = {
      get: async (k) => store[k] !== undefined ? store[k] : null,
      put: async (k, v) => { store[k] = v; },
    };

    for (let i = 0; i < MAX_REQUESTS_PER_MINUTE; i++) {
      const allowed = await checkAndIncrementRate(mockKv, NOW);
      assert.strictEqual(allowed, true, `request ${i + 1} must be allowed (under limit)`);
    }

    // 16th request must be denied
    const denied = await checkAndIncrementRate(mockKv, NOW);
    assert.strictEqual(denied, false, '16th request must be rate-limited');

    // New minute window resets counter
    const nextMinute = NOW + 60_000;
    const nextAllowed = await checkAndIncrementRate(mockKv, nextMinute);
    assert.strictEqual(nextAllowed, true, 'new minute window must allow requests');

    // createRateLimitedSynthesizer: calls synthesizer when under limit
    let synthCalled = false;
    const mockSynth = async (_text) => { synthCalled = true; return 'brief text'; };
    const store2 = {};
    const kv2 = {
      get: async k => store2[k] !== undefined ? store2[k] : null,
      put: async (k, v) => { store2[k] = v; },
    };
    const rateLimited = createRateLimitedSynthesizer(mockSynth, kv2);

    const result = await rateLimited('test input', NOW + 120_000);
    assert.strictEqual(result, 'brief text', 'synthesizer result must be returned when allowed');
    assert.strictEqual(synthCalled, true, 'synthesizer must be called when under rate limit');

    // createRateLimitedSynthesizer: returns null when limit exhausted
    const store3 = {};
    const kv3 = {
      get: async k => store3[k] !== undefined ? store3[k] : null,
      put: async (k, v) => { store3[k] = v; },
    };
    const rl2 = createRateLimitedSynthesizer(async () => 'result', kv3);
    const ts = NOW + 180_000;
    for (let i = 0; i < MAX_REQUESTS_PER_MINUTE; i++) await rl2('x', ts);
    const nullResult = await rl2('x', ts);
    assert.strictEqual(nullResult, null, 'must return null when rate limit exhausted');

  } catch (err) {
    console.error('FAIL - rate-limit-queue.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - rate-limit-queue.test.js');

export {};
