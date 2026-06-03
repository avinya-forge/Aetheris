import assert from 'assert';
import { callGemini, GEMINI_API_URL } from '../lib/gemini-client';

function makeFetcher(body: any, status = 200, shouldThrow = false) {
  return async () => {
    if (shouldThrow) throw new Error('Network error');
    return { ok: status >= 200 && status < 300, status, json: async () => body };
  };
}

(async () => {
  try {
    const rawData = {
      candidates: [
        { content: { parts: [{ text: 'A short factual brief.' }] } }
      ]
    };

    // Valid case
    const res = await callGemini('test prompt', 'test-key', makeFetcher(rawData));
    assert.strictEqual(
      res && res.candidates[0].content.parts[0].text,
      'A short factual brief.',
      'callGemini: should return expected text'
    );

    // Missing text/key
    assert.strictEqual(await callGemini('', 'key'), null, 'Should return null if text is empty');
    assert.strictEqual(await callGemini('text', ''), null, 'Should return null if apiKey is empty');

    // HTTP 500 case
    const errorRes = await callGemini('test', 'key', makeFetcher({}, 500));
    assert.strictEqual(errorRes, null, 'callGemini: HTTP 500 should return null');

    // Network error case (covers line 38-39)
    const networkErrRes = await callGemini('test', 'key', makeFetcher({}, 200, true));
    assert.strictEqual(networkErrRes, null, 'callGemini: Network error should return null');

    // JSON parse error (covers line 46-47)
    const badJsonFetcher = async () => ({
      ok: true,
      status: 200,
      json: async () => { throw new Error('Bad JSON'); }
    });
    const badJsonRes = await callGemini('test', 'key', badJsonFetcher as any);
    assert.strictEqual(badJsonRes, null, 'callGemini: JSON parse error should return null');

    assert.ok(GEMINI_API_URL.includes('googleapis.com'), 'GEMINI_API_URL: must point to googleapis.com');

    console.log('PASS - gemini-client.test.js');
  } catch (err: any) {
    console.error('FAIL - gemini-client.test.js:', err.message);
    process.exit(1);
  }
})();

export {};
