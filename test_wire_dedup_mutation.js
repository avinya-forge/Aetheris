const { deduplicateWires } = require('./lib/data/wire-deduplicator.js');

const events1 = [
    { id: '1', hash: 'abc' }
];
const events2 = JSON.parse(JSON.stringify(events1));

const deduped = deduplicateWires(events1);

console.log("Original events1:", JSON.stringify(events2, null, 2));
console.log("Mutated events1:", JSON.stringify(events1, null, 2));
console.log("Deduped is original element:", deduped[0] === events1[0]);
