import assert from 'assert';

class MockResponse {
  body: any;
  status: number;
  headers: Map<string, string>;
  constructor(body: any, init: any = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.headers = new Map(Object.entries(init.headers || {}));
  }
  async json() { return JSON.parse(this.body); }
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

    // Health
    const healthRes = await worker.fetch({ url: 'http://localhost/api/health', method: 'GET' }, env, {});
    assert.strictEqual(healthRes.status, 200);

    // Events
    const eventsRes = await worker.fetch({ url: 'http://localhost/api/events', method: 'GET' }, env, {});
    assert.strictEqual(eventsRes.status, 200);

    // History
    await env.CACHE.put('events:archive:2026-01-01', JSON.stringify([{ id: 'h1', timestamp: 123 }]));
    const historyRes = await worker.fetch({ url: 'http://localhost/api/events?date=2026-01-01', method: 'GET' }, env, {});
    const historyData = await historyRes.json();
    assert.strictEqual(historyData.length, 1);

    // Ghost Cards
    const ghostRes = await worker.fetch({ url: 'http://localhost/api/ghost-cards', method: 'GET' }, env, {});
    assert.strictEqual(ghostRes.status, 200);

    // Since filter
    const now = Date.now();
    const testEvents = [{ id: '1', timestamp: now }];
    await env.CACHE.put('events:latest', JSON.stringify(testEvents));
    const sinceReq = { url: 'http://localhost/api/events?since=' + (now - 10000), method: 'GET' };
    const sinceRes = await worker.fetch(sinceReq, env, {});
    const sinceData = await sinceRes.json();
    assert.strictEqual(sinceData.length, 1);

    // Error
    const badEnv = { CACHE: { get: () => { throw new Error('fail'); } } };
    // OPTIONS
    const optRes = await worker.fetch({ url: 'http://localhost/api/events', method: 'OPTIONS' }, env, {});
    assert.strictEqual(optRes.status, 204);

    // 404
    const notFoundRes = await worker.fetch({ url: 'http://localhost/api/unknown', method: 'GET' }, env, {});
    assert.strictEqual(notFoundRes.status, 404);

    const originalConsoleError = console.error;
    console.error = () => {};
    const errRes = await worker.fetch({ url: 'http://localhost/api/health', method: 'GET' }, badEnv, {});
    console.error = originalConsoleError;
    assert.strictEqual(errRes.status, 500);


    // MCP Tools Route (GET)
    const mcpGetRes = await worker.fetch({ url: 'http://localhost/api/mcp', method: 'GET' }, env, {});
    assert.strictEqual(mcpGetRes.status, 200);
    const mcpGetData = await mcpGetRes.json();
    assert.strictEqual(mcpGetData.tools.length, 39);
    assert.strictEqual(mcpGetData.tools[0].name, 'aetheris_tool_1');

    // MCP Tools Route (POST - Success)
    const validMcpPostReq = {
      url: 'http://localhost/api/mcp',
      method: 'POST',
      json: async () => ({ tool: 'aetheris_tool_1', parameters: { query: 'test' } })
    };
    const mcpPostRes = await worker.fetch(validMcpPostReq as any, env, {});
    assert.strictEqual(mcpPostRes.status, 200);
    const mcpPostData = await mcpPostRes.json();
    assert.strictEqual(mcpPostData.success, true);
    assert.strictEqual(mcpPostData.result, 'Executed aetheris_tool_1 with query: test');

    // MCP Tools Route (POST - Success no parameters)
    const validMcpPostReqNoParams = {
      url: 'http://localhost/api/mcp',
      method: 'POST',
      json: async () => ({ tool: 'aetheris_tool_1' })
    };
    const mcpPostResNoParams = await worker.fetch(validMcpPostReqNoParams as any, env, {});
    assert.strictEqual(mcpPostResNoParams.status, 200);

    // MCP Tools Route (POST - Tool Not Found)
    const invalidMcpPostReq = {
      url: 'http://localhost/api/mcp',
      method: 'POST',
      json: async () => ({ tool: 'nonexistent_tool' })
    };
    const mcpNotFoundRes = await worker.fetch(invalidMcpPostReq as any, env, {});
    assert.strictEqual(mcpNotFoundRes.status, 404);

    // MCP Tools Route (POST - Invalid JSON)
    const badJsonMcpPostReq = {
      url: 'http://localhost/api/mcp',
      method: 'POST',
      json: async () => { throw new Error('Syntax error'); }
    };
    const mcpBadJsonRes = await worker.fetch(badJsonMcpPostReq as any, env, {});
    assert.strictEqual(mcpBadJsonRes.status, 400);

    // MCP Tools Route (Invalid Method)
    const invalidMethodReq = { url: 'http://localhost/api/mcp', method: 'PUT' };
    const invalidMethodRes = await worker.fetch(invalidMethodReq as any, env, {});
    assert.strictEqual(invalidMethodRes.status, 405);

    // Scheduled
    const ctx = { waitUntil: (p: any) => p };

    // Cover scheduled without event.scheduledTime
    await worker.scheduled({}, env, ctx);
    await worker.scheduled(null, env, ctx);

    await worker.scheduled({ scheduledTime: Date.now() }, env, ctx);

    console.log('PASS - worker.test.js');
  } catch (err) {
    console.error('FAIL - worker.test.js:', err);
    process.exit(1);
  }
})();
export {};