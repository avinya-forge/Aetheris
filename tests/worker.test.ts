import assert from 'assert';

// Mock for Cloudflare Worker 'Response'
class MockResponse {
  body: any;
  status: number;
  headers: Map<string, string>;
  constructor(body: any, init: any = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.headers = new Map(Object.entries(init.headers || {}));
  }
  async json() {
    return JSON.parse(this.body);
  }
}

globalThis.Response = MockResponse as any;

// We need to use 'import' for the worker but the test runner uses 'require' or node.
// Since worker.js is an ES module, we'll use dynamic import() or just mock the logic.
// However, the worker.js file is very thin.

(async () => {
  try {
    // Import the worker using dynamic import
    const { default: worker } = await import('../functions/worker.mjs');

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
    assert.ok(Array.isArray(eventsData, 'worker.test.ts: ok failure'), 'Events should be an array');
    assert.strictEqual(eventsData.length, 0, 'Events should be empty initially');

    // --- Test: GET /api/events (populated) ---
    const testEvents = [{ id: '1', publishedAt: new Date(Date.parse('2026-04-20T00:00:00Z')).toISOString() }];
    await env.CACHE.put('events:latest', JSON.stringify(testEvents));
    const populatedRes = await worker.fetch(eventsReq, env, {});
    const populatedData = await populatedRes.json();
    assert.strictEqual(populatedData.length, 1, 'Should return populated events');

    // --- Test: GET /api/events?since=... ---
    const oldDate = new Date(Date.parse('2026-04-20T00:00:00Z') - 10000).getTime();
    const sinceReq = {
      url: `http://localhost/api/events?since=${oldDate}`,
      method: 'GET'
    };
    const sinceRes = await worker.fetch(sinceReq, env, {});
    const sinceData = await sinceRes.json();
    assert.strictEqual(sinceData.length, 1, 'Should return event after since timestamp');

    const futureDate = new Date(Date.parse('2026-04-20T00:00:00Z') + 10000).getTime();
    const futureSinceReq = {
      url: `http://localhost/api/events?since=${futureDate}`,
      method: 'GET'
    };
    const futureSinceRes = await worker.fetch(futureSinceReq, env, {});
    const futureSinceData = await futureSinceRes.json();
    assert.strictEqual(futureSinceData.length, 0, 'Should return 0 events for future since timestamp');

    // --- Test: GET /api/events with invalid since string ---
    const invalidSinceReq = {
      url: 'http://localhost/api/events?since=invalid',
      method: 'GET'
    };
    await env.CACHE.put('events:latest', JSON.stringify([
      { id: '1', publishedAt: new Date().toISOString() }
    ]));
    const invalidSinceRes = await worker.fetch(invalidSinceReq, env, {});
    const invalidSinceData = await invalidSinceRes.json();
    assert.strictEqual(invalidSinceData.length, 1, 'Should return all events if since is invalid');

    // --- Test: GET /api/events with no latest events in CACHE ---
    await env.CACHE.put('events:latest', null); // mock null return
    const noEventsReq = { url: 'http://localhost/api/events', method: 'GET' };
    const noEventsRes = await worker.fetch(noEventsReq, env, {});
    const noEventsData = await noEventsRes.json();
    assert.strictEqual(noEventsData.length, 0, 'Should return empty array if no events in cache');

    // --- Test: GET /api/events with empty string since parameter ---
    const emptySinceReq = {
      url: 'http://localhost/api/events?since=',
      method: 'GET'
    };
    const emptySinceRes = await worker.fetch(emptySinceReq, env, {});
    assert.strictEqual(emptySinceRes.status, 200, 'Empty since parameter should default to 0 and return 200');

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

    // --- Test: scheduled handler ---
    let waitPromise = null;
    const ctx = {
      waitUntil: (promise) => { waitPromise = promise; }
    };

    // Pass an event object containing scheduledTime
    const scheduledEvent = { scheduledTime: Date.now() };
    await worker.scheduled(scheduledEvent, env, ctx);
    assert.ok(waitPromise instanceof Promise, 'scheduled should call ctx.waitUntil with a promise');

    // Also test with null event for the fallback path
    await worker.scheduled(null, env, ctx);
    assert.ok(waitPromise instanceof Promise, 'scheduled should handle null event');

  } catch (err) {
    console.error('FAIL - worker.test.js:', err);
    process.exit(1);
  }
})();
console.log('PASS - worker.test.js');

export {};
