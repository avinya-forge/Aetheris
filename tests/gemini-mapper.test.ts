import assert from 'assert';
import { mapGeminiResponse } from '../lib/gemini-mapper';

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

    const brief = mapGeminiResponse(rawData);
    assert.strictEqual(brief, 'A short factual brief.', "gemini-mapper.test.js: simple brief mapping failed");

    const longData = {
      candidates: [
        {
          content: {
            parts: [
              { text: 'word '.repeat(40).trim() }
            ]
          }
        }
      ]
    };
    const capped = mapGeminiResponse(longData);
    const wordCount = capped.split(/\s+/).length;
    assert.strictEqual(wordCount, 30, 'Should be 30 words');
    assert.ok(capped.endsWith('...'), "gemini-mapper.test.ts: long response should be capped with ellipsis");

    console.log('PASS - gemini-mapper.test.js');
  } catch (err) {
    console.error('FAIL - gemini-mapper.test.js:', err.message);
    process.exit(1);
  }
})();

export {};
