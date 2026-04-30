const assert = require('assert');
const { fetchGdelt, GDELT_URL } = require('../lib/data/gdelt-client.js');

function makeFetcher(body, status = 200) {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });
}

(async () => {
  try {
    const rawData = {
      articles: [
        { url: 'https://a.com', title: 'A', seendate: '20260410T000000Z' },
        { url: 'https://b.com', title: 'B', seendate: '20260410T000001Z' }
      ]
    };

    const result = await fetchGdelt(makeFetcher(rawData));
    assert.strictEqual(result.articles.length, 2, 'return raw articles array');
    assert.strictEqual(result.articles[0].url, 'https://a.com', "Assert failed in strictEqual");

    // malformed response
    const empty = await fetchGdelt(makeFetcher({ not_articles: [] }));
    assert.deepStrictEqual(empty.not_articles, [], 'missing articles key');

    assert.ok(GDELT_URL.includes('api.gdeltproject.org'), 'URL must point to GDELT');
    assert.ok(GDELT_URL.includes('format=json'), 'GDELT_URL must request JSON format');

  } catch (err) {
    console.error('FAIL - gdelt-client.test.js:', err.message);
    process.exit(1);
  }
})();
console.log('PASS - gdelt-client.test.js');
