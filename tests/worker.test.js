const assert = require('assert');

// Mock for Cloudflare Worker 'Response'
class MockResponse {
  constructor(body, init = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.headers = new Map(Object.entries(init.headers || {}));
  }
  async json() {
    return JSON.parse(this.body);
  }
}

globalThis.Response = MockResponse;

// We need to use 'import' for the worker but the test runner uses 'require' or node.
// Since worker.js is an ES module, we'll use dynamic import() or just mock the logic.
// However, the worker.js file is very thin.

(async () => {
  try {
    // Import the worker using dynamic import
    const { default: worker } = await import('../functions/worker.js');

    const env = {
      CACHE: {
        store: new Map(),
        async get(key) { return this.store.get(key) || null; },
        async put(key, value) { this.store.set(key, value); }
      }
    };

    // --- Test: GET /api/health ---
    const healthReq = {
      url: 'http://localhost/api/health',
      method: 'GET'
    };
    const healthRes = await worker.fetch(healthReq, env, {});
    const healthData = await healthRes.json();
    assert.strictEqual(healthRes.status, 200, 'Health status should be 200');
    assert.strictEqual(healthData.ok, true, 'Health ok should be true');

    // --- Test: GET /api/events (empty) ---
    const eventsReq = {
      url: 'http://localhost/api/events',
      method: 'GET'
    };
    const eventsRes = await worker.fetch(eventsReq, env, {});
    const eventsData = await eventsRes.json();
    assert.strictEqual(eventsRes.status, 200, 'Events status should be 200');
    assert.ok(Array.isArray(eventsData), 'Events should be an array');
    assert.strictEqual(eventsData.length, 0, 'Events should be empty initially');

    // --- Test: GET /api/events (populated) ---
    const testEvents = [{ id: '1', publishedAt: new Date().toISOString() }];
    await env.CACHE.put('events:latest', JSON.stringify(testEvents));
    const populatedRes = await worker.fetch(eventsReq, env, {});
    const populatedData = await populatedRes.json();
    assert.strictEqual(populatedData.length, 1, 'Should return populated events');

    // --- Test: GET /api/events?since=... ---
    const oldDate = new Date(Date.now() - 10000).getTime();
    const sinceReq = {
      url: `http://localhost/api/events?since=${oldDate}`,
      method: 'GET'
    };
    const sinceRes = await worker.fetch(sinceReq, env, {});
    const sinceData = await sinceRes.json();
    assert.strictEqual(sinceData.length, 1, 'Should return event after since timestamp');

    const futureDate = new Date(Date.now() + 10000).getTime();
    const futureSinceReq = {
      url: `http://localhost/api/events?since=${futureDate}`,
      method: 'GET'
    };
    const futureSinceRes = await worker.fetch(futureSinceReq, env, {});
    const futureSinceData = await futureSinceRes.json();
    assert.strictEqual(futureSinceData.length, 0, 'Should return 0 events for future since timestamp');

    // --- Test: OPTIONS /api/events ---
    const optionsReq = {
      url: 'http://localhost/api/events',
      method: 'OPTIONS'
    };
    const optionsRes = await worker.fetch(optionsReq, env, {});
    assert.strictEqual(optionsRes.status, 204, 'OPTIONS should return 204');

    // --- Test: 404 Not Found ---
    const notFoundReq = {
      url: 'http://localhost/api/unknown',
      method: 'GET'
    };
    const notFoundRes = await worker.fetch(notFoundReq, env, {});
    assert.strictEqual(notFoundRes.status, 404, 'Unknown path should return 404');

  } catch (err) {
    console.error('FAIL - worker.test.js:', err);
    process.exit(1);
  }
})();
console.log('PASS - worker.test.js');
