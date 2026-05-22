const assert = require('assert');
const { mapGdeltArticle } = require('../lib/data/news-mapper');

try {
  const rawArt = { url: "http://example.com", title: "Test Article", seendate: "20240101", socialimage: "http://img.com" };
  const mappedArt = mapGdeltArticle(rawArt);
  assert.strictEqual(mappedArt.text, "Test Article", "news-mapper.test.js strictEqual failed");
  assert.strictEqual(mappedArt.impactScore, 10, 'news-mapper.test.js: value mismatch');
  assert.strictEqual(mappedArt.source, 'gdelt', 'news-mapper.test.js: value mismatch');

} catch (err) {
  console.error('FAIL - news-mapper.test.js:', err);
  process.exit(1);
}
console.log('PASS - news-mapper.test.js');

export {};
