const assert = require('assert');
const { synthesizeSources } = require('../lib/data/extractive-synthesis.js');

(async () => {
  try {
    // Short sources: no truncation needed
    const shortSources = [{ content: 'Source 1 data.' }, { content: 'Source 2 data.' }];
    const short = await synthesizeSources(shortSources);
    assert.strictEqual(short, 'Source 1 data. Source 2 data.', 'short sources must join without truncation');

    // Long sources: truncated to 30 words with ellipsis
    const longSources = [
      { content: 'This is a very long string that should be cut off when it reaches thirty words so that we can test the extractive synthesis function accurately without failing.' },
      { content: 'We add more content here just to make sure the combined length exceeds the 30 words limit for the summary.' },
    ];
    const long = await synthesizeSources(longSources);
    const wordCount = long.replace(/\.\.\.$/, '').trim().split(/\s+/).length;
    assert.strictEqual(wordCount, 30, 'truncated brief must be exactly 30 words before ellipsis');
    assert.ok(long.endsWith('...'), 'truncated brief must end with ...');

    // Empty and null cases
    const empty = await synthesizeSources([]);
    assert.strictEqual(empty, '', 'empty array must return empty string');

    const nullResult = await synthesizeSources(null);
    assert.strictEqual(nullResult, '', 'null sources must return empty string');

    const noContent = await synthesizeSources([{ content: '' }]);
    assert.strictEqual(noContent, '', 'sources with empty content must return empty string');

    const missingContent = await synthesizeSources([{}]);
    assert.strictEqual(missingContent, '', 'sources without content field must return empty string');

    // Synthesizer injection: uses synthesizer result when non-null
    let synthCalledWith = '';
    const mockSynth = async (text) => { synthCalledWith = text; return 'AI brief'; };
    const aiResult = await synthesizeSources(shortSources, mockSynth);
    assert.strictEqual(aiResult, 'AI brief', 'synthesizer result must be returned when provided');
    assert.strictEqual(synthCalledWith, 'Source 1 data. Source 2 data.', 'synthesizer must receive combined text');

    // Synthesizer injection: falls back to truncation when synthesizer returns null
    const nullSynth = async () => null;
    const nullSynthResult = await synthesizeSources(shortSources, nullSynth);
    assert.strictEqual(nullSynthResult, 'Source 1 data. Source 2 data.', 'null synthesizer result must fall back to truncation');

    // Synthesizer injection: falls back when synthesizer throws
    const throwSynth = async () => { throw new Error('API error'); };
    const throwResult = await synthesizeSources(shortSources, throwSynth);
    assert.strictEqual(throwResult, 'Source 1 data. Source 2 data.', 'synthesizer error must fall back to truncation');

    console.log('PASS - extractive-synthesis.test.js');
  } catch (err) {
    console.error('FAIL - extractive-synthesis.test.js:', err.message);
    process.exit(1);
  }
})();
