const assert = require('assert');
const { synthesizeSources } = require('../lib/data/extractive-synthesis.js');

const shortSources = [
  { content: "Source 1 data." },
  { content: "Source 2 data." }
];

const shortSummary = synthesizeSources(shortSources);
assert.strictEqual(shortSummary, "Source 1 data. Source 2 data.");

const longSources = [
  { content: "This is a very long string that should be cut off when it reaches thirty words so that we can test the extractive synthesis function accurately without failing." },
  { content: "We add more content here just to make sure the combined length exceeds the 30 words limit for the summary." }
];

const longSummary = synthesizeSources(longSources);
assert.strictEqual(longSummary.split(/\s+/).length, 30);
assert.ok(longSummary.endsWith('...'));
assert.strictEqual(
  longSummary,
  "This is a very long string that should be cut off when it reaches thirty words so that we can test the extractive synthesis function accurately without failing. We add..."
);

// Empty or missing cases
assert.strictEqual(synthesizeSources([]), "");
assert.strictEqual(synthesizeSources(null), "");
assert.strictEqual(synthesizeSources([{ content: "" }]), "");
assert.strictEqual(synthesizeSources([{}]), "");

console.log('extractive-synthesis test passed');
