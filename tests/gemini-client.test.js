const assert = require('assert');
const { callGemini, buildSynthesizer, MAX_WORDS } = require('../lib/ai/gemini-client.js');

(async () => {
  try {
    // Happy path: mock returns 10-word response
    const tenWordText = 'word1 word2 word3 word4 word5 word6 word7 word8 word9 word10';
    const mockFetcher = async () => ({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: tenWordText }] } }],
      }),
    });

    const result = await callGemini('some input text', 'test-key', mockFetcher);
    assert.strictEqual(typeof result, 'string', 'result must be a string');
    assert.ok(result.split(/\s+/).length <= MAX_WORDS, 'result must not exceed MAX_WORDS');
    assert.strictEqual(result, tenWordText, 'result must match mock output');

    // 30-word cap enforced on model output > 30 words
    const fiftyWords = Array.from({ length: 50 }, (_, i) => `w${i}`).join(' ');
    const longFetcher = async () => ({
      ok: true,
      json: async () => ({ candidates: [{ content: { parts: [{ text: fiftyWords }] } }] }),
    });
    const capped = await callGemini('input', 'key', longFetcher);
    assert.ok(capped.endsWith('...'), 'capped output must end with ...');
    const wordCount = capped.replace(/\.\.\.$/, '').trim().split(/\s+/).length;
    assert.strictEqual(wordCount, MAX_WORDS, 'capped output must be exactly MAX_WORDS words before ellipsis');

    // null apiKey → null
    const noKey = await callGemini('text', null, mockFetcher);
    assert.strictEqual(noKey, null, 'null apiKey must return null');

    // empty text → null
    const noText = await callGemini('', 'key', mockFetcher);
    assert.strictEqual(noText, null, 'empty text must return null');

    // non-ok response → null
    const failFetcher = async () => ({ ok: false });
    const failResult = await callGemini('text', 'key', failFetcher);
    assert.strictEqual(failResult, null, 'non-ok response must return null');

    // network error → null
    const errorFetcher = async () => { throw new Error('network'); };
    const errorResult = await callGemini('text', 'key', errorFetcher);
    assert.strictEqual(errorResult, null, 'network error must return null');

    // malformed JSON → null
    const badJsonFetcher = async () => ({
      ok: true,
      json: async () => { throw new Error('parse error'); },
    });
    const badJson = await callGemini('text', 'key', badJsonFetcher);
    assert.strictEqual(badJson, null, 'malformed JSON must return null');

    // missing candidates path → null
    const emptyFetcher = async () => ({
      ok: true,
      json: async () => ({ candidates: [] }),
    });
    const empty = await callGemini('text', 'key', emptyFetcher);
    assert.strictEqual(empty, null, 'empty candidates must return null');

    // buildSynthesizer: returns a bound function
    const synth = buildSynthesizer('api-key', mockFetcher);
    assert.strictEqual(typeof synth, 'function', 'buildSynthesizer must return a function');
    const synthResult = await synth('test text');
    assert.strictEqual(typeof synthResult, 'string', 'synthesizer must return a string');
    assert.strictEqual(synthResult, tenWordText, 'synthesizer must use bound fetcher');

    console.log('PASS - gemini-client.test.js');
  } catch (err) {
    console.error('FAIL - gemini-client.test.js:', err.message);
    process.exit(1);
  }
})();
