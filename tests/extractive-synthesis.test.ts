import assert from 'assert';
import { synthesizeSources } from '../lib/extractive-synthesis';

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
    assert.ok(long.endsWith('...'), 'extractive-synthesis.test.ts: truncated brief must end with ...');

    // Empty and null cases
    const empty = await synthesizeSources([]);
    assert.strictEqual(empty, '', 'empty array must return empty string');

    const nullResult = await synthesizeSources(null);
    assert.strictEqual(nullResult, '', 'null sources must return empty string');

    const noContent = await synthesizeSources([{ content: '' }]);
    assert.strictEqual(noContent, '', 'sources with empty content must return empty string');

    const missingContent = await synthesizeSources([{}]);
    assert.strictEqual(missingContent, '', 'sources without content field must return empty string');

    // Synthesizer injection: uses synthesizer result when sources >= 20
    let synthCalledWith = '';
    const mockSynth = async (text: string) => { synthCalledWith = text; return 'AI brief'; };
    const manySources = Array(20).fill({ content: 'data' });
    const aiResult = await synthesizeSources(manySources, mockSynth);
    assert.strictEqual(aiResult, 'AI brief', 'synthesizer result must be returned when >= 20 sources');
    assert.ok(synthCalledWith.includes('data'), 'synthesizer must receive combined text');

    // Synthesizer injection: bypasses AI when sources < 20
    let synth2Called = false;
    const mockSynth2 = async (_text: string) => { synth2Called = true; return 'AI brief'; };
    const lowSources = Array(19).fill({ content: 'data' });
    const lowResult = await synthesizeSources(lowSources, mockSynth2);
    assert.strictEqual(synth2Called, false, 'synthesizer must NOT be called when < 20 sources');
    assert.strictEqual(lowResult, lowSources.map(s => s.content).join(' '), 'fallback must be used for low sources');

    // Synthesizer injection: falls back to truncation when synthesizer returns null
    const nullSynth = async () => null;
    const nullSynthResult = await synthesizeSources(manySources, nullSynth);
    assert.ok(nullSynthResult.includes('data'), 'null synthesizer result must fall back to truncation');

    // Synthesizer injection: falls back when synthesizer throws
    const throwSynth = async () => { throw new Error('API error'); };
    const throwResult = await synthesizeSources(manySources, throwSynth);
    assert.ok(throwResult.includes('data'), 'synthesizer error must fall back to truncation');

    // Enforce 30-word limit: throw an error if the synthesizer returns > 30 words
    const longSynth = async () => 'word '.repeat(31).trim();
    let caughtError = false;
    try {
      await synthesizeSources(manySources, longSynth);
    } catch (err) {
      caughtError = true;
      assert.strictEqual(err.message, 'AI synthesis exceeds 30 words', 'should throw specific error message for >30 words');
    }
    assert.ok(caughtError, 'synthesizer must throw an error if result exceeds 30 words');

    console.log('PASS - extractive-synthesis.test.js');
  } catch (err) {
    console.error('FAIL - extractive-synthesis.test.js:', err.message);
    process.exit(1);
  }
})();

export {};
