const assert = require('assert');
const { callGemini, GEMINI_API_URL } = require('../lib/ai/gemini-client');

function makeFetcher(body, status = 200) {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });
}

(async () => {
  try {
    const rawData = {
      candidates: [
        {
          content: {
            parts: [
              { text: 'A short factual brief.' }
            ]
          }
        }
      ]
    };

    const res = await callGemini('test prompt', 'test-key', makeFetcher(rawData));
    assert.strictEqual(
      res.candidates[0].content.parts[0].text,
      'A short factual brief.',
      "callGemini: should return expected text from candidates"
    );

    const errorRes = await callGemini('test', 'key', makeFetcher({}, 500));
    assert.strictEqual(errorRes, null, 'callGemini: HTTP 500 should return null');

    assert.ok(GEMINI_API_URL.includes('googleapis.com'), 'GEMINI_API_URL: must point to googleapis.com');

  } catch (err) {
    console.error('FAIL - gemini-client.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - gemini-client.test.js');

export {};
