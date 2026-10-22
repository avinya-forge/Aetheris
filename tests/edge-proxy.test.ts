import assert from 'assert';
const { processRequest } = require('../functions/edge-proxy.js');

function testEdgeProxy() {

  // Test: Missing payload
  const badRequest = {};
  const badResponse = processRequest(badRequest);

  assert.strictEqual(badResponse.status, 400, 'Should return 400 status for missing payload');
  assert.strictEqual(badResponse.body, 'Bad Request', 'Should return "Bad Request" body');

  // Test: Missing payload (has data object but no payload key)
  const badRequest2 = { someOtherKey: 'value' };
  const badResponse2 = processRequest(badRequest2);

  assert.strictEqual(badResponse2.status, 400, 'Should return 400 status for missing payload key');
  assert.strictEqual(badResponse2.body, 'Bad Request', 'Should return "Bad Request" body');

  // Test: Invalid payload type (Array)
  const arrayRequest = ['payload'];
  const arrayResponse = processRequest(arrayRequest);

  assert.strictEqual(arrayResponse.status, 400, 'Should return 400 status for array payload');
  assert.strictEqual(arrayResponse.body, 'Bad Request', 'Should return "Bad Request" body');

  // Test: Invalid payload type (string)
  const stringRequest = 'payload';
  const stringResponse = processRequest(stringRequest);

  assert.strictEqual(stringResponse.status, 400, 'Should return 400 status for string payload');

  // Test: Valid payload
  const validRequest = { payload: { data: 'some data' } };
  const validResponse = processRequest(validRequest);

  assert.strictEqual(validResponse.status, 200, 'Should return 200 status for valid payload');
  assert.deepStrictEqual(validResponse.body, { data: 'some data' }, 'Should return the payload as body');
  assert.strictEqual(validResponse.edgeComputed, true, 'Should include edgeComputed flag');

  // Test: Rate Limiting
  const rateLimitIp = '192.168.1.1';
  let lastResponse;

  // We hit the limit (100 tokens max)
  for (let i = 0; i < 100; i++) {
    lastResponse = processRequest(validRequest, rateLimitIp);
    // Might hit 429 slightly earlier if the loop runs very fast, but typically 100 is exact
  }

  // The 101st request should be rate limited immediately
  const rateLimitedResponse = processRequest(validRequest, rateLimitIp);
  assert.strictEqual(rateLimitedResponse.status, 429, 'Should return 429 status when rate limit exceeded');
  assert.strictEqual(rateLimitedResponse.body, 'Too Many Requests', 'Should return Too Many Requests body');
}

testEdgeProxy();
console.log('PASS - edge-proxy.test.js');

export {};
