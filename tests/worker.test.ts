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

(async () => {
  try {
    const { default: worker } = await import('../functions/worker.mjs');

    const env = {
      CACHE: {
        store: new Map(),
        async get(key: string) { return this.store.get(key) || null; },
        async put(key: string, value: string) { this.store.set(key, value); }
      }
    };

    // --- Test: GET /api/health ---
    const healthReq = { url: 'http://localhost/api/health', method: 'GET' };
    const healthRes = await worker.fetch(healthReq, env, {});
    const healthData = await healthRes.json();
    assert.strictEqual(healthRes.status, 200, 'Health status should be 200');
    assert.strictEqual(healthData.ok, true, 'Health ok should be true');

    // --- Test: GET /api/events ---
    const eventsReq = { url: 'http://localhost/api/events', method: 'GET' };
    const eventsRes = await worker.fetch(eventsReq, env, {});
    assert.strictEqual(eventsRes.status, 200, 'Events status should be 200');

    // --- Test: GET /api/ghost-cards ---
    const ghostReq = { url: 'http://localhost/api/ghost-cards', method: 'GET' };
    const ghostRes = await worker.fetch(ghostReq, env, {});
    assert.strictEqual(ghostRes.status, 200, 'Ghost cards status should be 200');

    // --- Test: GET /api/events with since filter ---
    const testEvents = [{ id: '1', publishedAt: new Date().toISOString() }];
    await env.CACHE.put('events:latest', JSON.stringify(testEvents));
    const sinceReq = { url: 'http://localhost/api/events?since=' + (Date.now() - 10000), method: 'GET' };
    const sinceRes = await worker.fetch(sinceReq, env, {});
    const sinceData = await sinceRes.json();
    assert.strictEqual(sinceData.length, 1, 'Should return event after since');

    // --- Test: OPTIONS ---
    const optionsReq = { url: 'http://localhost/api/events', method: 'OPTIONS' };
    const optionsRes = await worker.fetch(optionsReq, env, {});
    assert.strictEqual(optionsRes.status, 204, 'OPTIONS should return 204');

    // --- Test: 404 ---
    const notFoundReq = { url: 'http://localhost/api/unknown', method: 'GET' };
    const notFoundRes = await worker.fetch(notFoundReq, env, {});
    assert.strictEqual(notFoundRes.status, 404, 'Unknown should return 404');

    // --- Test: Fetch Error ---
    const envWithError = {
      CACHE: { async get() { throw new Error('Simulated Error'); } }
    };
    const healthResError = await worker.fetch(healthReq, envWithError, {});
    assert.strictEqual(healthResError.status, 500, 'Should return 500');

    // --- Test: Scheduled ---
    let waitCalled = false;
    const ctx = { waitUntil: (p: any) => { waitCalled = true; return p; } };
    await worker.scheduled({ scheduledTime: Date.now() }, env, ctx);
    assert.ok(waitCalled, 'Should call waitUntil');

    // --- Test: Scheduled Error ---
    const badEnv = { CACHE: { get: () => { throw new Error('fail'); } } };
    await worker.scheduled(null, badEnv, ctx);

    console.log('PASS - worker.test.js');
  } catch (err) {
    console.error('FAIL - worker.test.js:', err);
    process.exit(1);
  }
})();

export {};
