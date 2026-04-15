const assert = require('assert');
const { mapGdeltArticle } = require('../lib/data/news-mapper.js');

try {
  const rawArt = { url: "http://example.com", title: "Test Article", seendate: "20240101", socialimage: "http://img.com" };
  const mappedArt = mapGdeltArticle(rawArt);
  assert.strictEqual(mappedArt.text, "Test Article");
  assert.strictEqual(mappedArt.impactScore, 10, 'Must match expected value');
  assert.strictEqual(mappedArt.source, 'gdelt', 'Must match expected value');

  console.log('PASS - news-mapper.test.js');
} catch (err) {
  console.error('FAIL - news-mapper.test.js:', err);
  process.exit(1);
}
