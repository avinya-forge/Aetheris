import assert from 'assert';
import { mapGdeltArticle } from '../lib/news-mapper';

try {
  const rawArt = { url: 'http://example.com', title: 'Test Article', seendate: '20240101', socialimage: 'http://img.com' };
  const mappedArt = mapGdeltArticle(rawArt);
  assert.strictEqual(mappedArt.text, 'Test Article', 'news-mapper.test.js strictEqual failed');
  assert.strictEqual(mappedArt.impactScore, 10, 'news-mapper.test.js: value mismatch');
  assert.strictEqual(mappedArt.source, 'gdelt', 'news-mapper.test.js: value mismatch');

  // Test category categorization branches
  assert.strictEqual(mapGdeltArticle({ title: 'stock market crash', domain: 'finance.com' }).category, 'markets');
  assert.strictEqual(mapGdeltArticle({ title: 'severe storm weather warning' }).category, 'environment');
  assert.strictEqual(mapGdeltArticle({ title: 'local city council police update' }).category, 'local');
  assert.strictEqual(mapGdeltArticle({ title: 'auto sports property estate' }).category, 'classifieds');

} catch (err) {
  console.error('FAIL - news-mapper.test.js:', err);
  process.exit(1);
}
console.log('PASS - news-mapper.test.js');

export {};
