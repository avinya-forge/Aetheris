import assert from 'assert';
import { filterByImpact } from '../lib/impact-filter';

const newsData = [
  { id: 1, impactScore: 8, county: 'King', category: 'technology' },
  { id: 2, impactScore: 4, county: 'King', tags: ['weather', 'local'] },
  { id: 3, impactScore: 9, county: 'Pierce', category: 'technology' },
  { id: 4, impactScore: 2, county: 'Snohomish' },
  { id: 5, impactScore: 7, category: 'politics' }
];

// Test 1: Only impact score
const threshold1 = { minImpactScore: 5 };
const result1 = filterByImpact(newsData, threshold1);
assert.strictEqual(result1.length, 3, 'impact-filter.test.js: value mismatch');
assert.strictEqual(result1[0].id, 1, 'impact-filter.test.js: value mismatch');
assert.strictEqual(result1[1].id, 3, 'impact-filter.test.js: value mismatch');
assert.strictEqual(result1[2].id, 5, 'impact-filter.test.js: value mismatch');

// Test 2: Impact score + county
const threshold2 = { minImpactScore: 5, county: 'King' };
const result2 = filterByImpact(newsData, threshold2);
assert.strictEqual(result2.length, 1, 'impact-filter.test.js: value mismatch');
assert.strictEqual(result2[0].id, 1, 'impact-filter.test.js: value mismatch'); // Item 5 has no county, now it's excluded because `item.county` is undefined which !== 'King'

// Test 3: Impact score + interests
const threshold3 = { minImpactScore: 1, interests: ['weather'] };
const result3 = filterByImpact(newsData, threshold3);
assert.strictEqual(result3.length, 1, 'impact-filter.test.js: value mismatch');
assert.strictEqual(result3[0].id, 2, 'impact-filter.test.js: value mismatch');

// Test 4: Impact score + county + interests
const threshold4 = { minImpactScore: 3, county: 'King', interests: ['technology'] };
const result4 = filterByImpact(newsData, threshold4);
assert.strictEqual(result4.length, 1, 'impact-filter.test.js: value mismatch');
assert.strictEqual(result4[0].id, 1, 'impact-filter.test.js: value mismatch');

console.log('PASS - impact-filter.test.js');

export {};
