import assert from 'assert';
import { isStale, interpolateNowcast, STALE_THRESHOLD_MS } from '../lib/nowcast-interpolator';

(async () => {
  try {
    const NOW = 1_000_000_000_000;

    // isStale: event older than threshold → stale
    const staleEvent = { timestamp: NOW - STALE_THRESHOLD_MS - 1 };
    assert.strictEqual(isStale(staleEvent, NOW), true, 'event 1ms past threshold must be stale');

    // isStale: event newer than threshold → not stale
    const freshEvent = { timestamp: NOW - STALE_THRESHOLD_MS + 1_000 };
    assert.strictEqual(isStale(freshEvent, NOW), false, 'event within threshold must not be stale');

    // isStale: event at exact boundary → stale
    const boundaryEvent = { timestamp: NOW - STALE_THRESHOLD_MS };
    assert.strictEqual(isStale(boundaryEvent, NOW), true, 'event at exact threshold boundary must be stale');

    // isStale: uses publishedAt when timestamp absent
    const byPublished = { publishedAt: NOW - STALE_THRESHOLD_MS - 1 };
    assert.strictEqual(isStale(byPublished, NOW), true, 'publishedAt must be used when timestamp is absent');

    // isStale: no timestamp → false (cannot determine)
    assert.strictEqual(isStale({}, NOW), false, 'event with no timestamp must return false');
    assert.strictEqual(isStale(null as any, NOW), false, 'null event must return false');

    // interpolateNowcast: null event → null
    const nullResult = await interpolateNowcast(null, null, NOW);
    assert.strictEqual(nullResult, null, 'null event must return null');

    // interpolateNowcast: no synthesizer → truncation fallback
    const event = { timestamp: NOW - STALE_THRESHOLD_MS - 1, content: 'test content text' };
    const interpolated = await interpolateNowcast(event, null, NOW);
    assert.strictEqual(interpolated.interpolated, true, 'output must have interpolated: true');
    assert.strictEqual(interpolated.interpolatedAt, NOW, 'interpolatedAt must equal now');
    assert.strictEqual(typeof interpolated.content, 'string', 'content must be a string');
    assert.ok(interpolated.content.length > 0, 'content must not be empty');

    // interpolateNowcast: preserves original content
    assert.strictEqual(interpolated.original, 'test content text', 'original content must be preserved');

    // interpolateNowcast: synthesizer called and result used
    let synthInput = '';
    const mockSynth = async (text: string) => { synthInput = text; return 'AI brief here'; };
    const aiInterpolated = await interpolateNowcast(event, mockSynth, NOW);
    assert.strictEqual(aiInterpolated.content, 'AI brief here', 'synthesizer output must be used when non-null');
    assert.strictEqual(synthInput, 'test content text', 'synthesizer must receive event content');
    assert.strictEqual(aiInterpolated.interpolated, true, 'AI-interpolated event must have interpolated: true');
    assert.strictEqual(aiInterpolated.original, 'test content text', 'original must be preserved in AI path');

    // interpolateNowcast: synthesizer returning null → truncation fallback
    const nullSynth = async () => null;
    const nullFallback = await interpolateNowcast(event, nullSynth, NOW);
    assert.strictEqual(nullFallback.interpolated, true, 'null synthesizer result must still set interpolated: true');
    assert.strictEqual(nullFallback.content, 'test content text', 'null synth result must fall back to truncation');

    // interpolateNowcast: synthesizer throws → truncation fallback
    const throwSynth = async () => { throw new Error('api error'); };
    const throwFallback = await interpolateNowcast(event, throwSynth, NOW);
    assert.strictEqual(throwFallback.interpolated, true, 'throwing synthesizer must still set interpolated: true');
    assert.strictEqual(typeof throwFallback.content, 'string', 'throwing synthesizer must fall back to string content');

    // interpolateNowcast: long content → truncated to 30 words
    const longWords = Array.from({ length: 50 }, (_, i) => `word${i}`).join(' ');
    const longEvent = { content: longWords };
    const longResult = await interpolateNowcast(longEvent, null, NOW);
    const wordCount = longResult.content.replace(/\.\.\.$/, '').trim().split(/\s+/).length;
    assert.strictEqual(wordCount, 30, 'long content must be truncated to 30 words');
    assert.ok(longResult.content.endsWith('...'), 'nowcast-interpolator.test.ts: long content should be capped');

    // interpolateNowcast: spreads all original fields
    const richEvent = { id: 'evt-1', source: 'noaa', content: 'brief text', impactScore: 80 };
    const richResult = await interpolateNowcast(richEvent, null, NOW);
    assert.strictEqual(richResult.id, 'evt-1', 'id field must be preserved');
    assert.strictEqual(richResult.source, 'noaa', 'source field must be preserved');
    assert.strictEqual(richResult.impactScore, 80, 'impactScore must be preserved');

    console.log('PASS - nowcast-interpolator.test.js');
  } catch (err) {
    console.error('FAIL - nowcast-interpolator.test.js:', err.message);
    process.exit(1);
  }
})();

export {};
