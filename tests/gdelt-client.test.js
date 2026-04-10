const assert = require('assert');
const { fetchGdelt, GDELT_URL } = require('../lib/data/gdelt-client.js');

function makeFetcher(body, status = 200) {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });
}

(async () => {
  try {
    const articles = [
      { url: 'https://example.com/1', title: 'Flood warning issued', seendate: '2026-04-10T00:00:00Z', socialimage: 'img.jpg' },
      { url: 'https://example.com/2', title: 'Trade talks resume', seendate: '2026-04-10T00:01:00Z' },
      { url: null, seendate: '2026-04-10T00:02:00Z', title: 'No URL article' },
    ];

    const result = await fetchGdelt(makeFetcher({ articles }));
    assert.strictEqual(Array.isArray(result), true, 'must return array');
    assert.strictEqual(result.length, 3, 'must return all articles');
    assert.strictEqual(result[0].source, 'gdelt', 'source must be gdelt');
    assert.strictEqual(result[0].text, 'Flood warning issued', 'text from title');
    assert.strictEqual(result[0].impactScore, 10, 'socialimage → impactScore 10');
    assert.strictEqual(result[1].impactScore, 5, 'no socialimage → impactScore 5');

    const empty = await fetchGdelt(makeFetcher({ articles: [] }));
    assert.deepStrictEqual(empty, [], 'empty articles → empty array');

    const noKey = await fetchGdelt(makeFetcher({}));
    assert.deepStrictEqual(noKey, [], 'missing articles key → empty array');

    let threw = false;
    try { await fetchGdelt(makeFetcher({}, 503)); } catch (_) { threw = true; }
    assert.strictEqual(threw, true, 'HTTP error must throw');

    assert.ok(GDELT_URL.includes('gdeltproject.org'), 'GDELT_URL must point to gdeltproject.org');
    assert.ok(GDELT_URL.includes('format=json'), 'GDELT_URL must request JSON format');

    console.log('PASS - gdelt-client.test.js');
  } catch (err) {
    console.error('FAIL - gdelt-client.test.js:', err.message);
    process.exit(1);
  }
})();
