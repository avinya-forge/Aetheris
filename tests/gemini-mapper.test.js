const assert = require('assert');
const { mapGeminiResponse } = require('../lib/ai/gemini-mapper.js');

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
    assert.strictEqual(brief, 'A short factual brief.', "Assert failed in strictEqual");

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
    assert.ok(capped.endsWith('...'), "Assert failed in ok");

  } catch (err) {
    console.error('FAIL - gemini-mapper.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - gemini-mapper.test.js');
