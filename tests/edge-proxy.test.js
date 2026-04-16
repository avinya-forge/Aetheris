const assert = require('assert');
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

  // Test: Valid payload
  const validRequest = { payload: { data: 'some data' } };
  const validResponse = processRequest(validRequest);

  assert.strictEqual(validResponse.status, 200, 'Should return 200 status for valid payload');
  assert.deepStrictEqual(validResponse.body, { data: 'some data' }, 'Should return the payload as body');
  assert.strictEqual(validResponse.edgeComputed, true, 'Should include edgeComputed flag');

}

testEdgeProxy();
console.log('PASS - edge-proxy.test.js');
