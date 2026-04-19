const { identifyClusters } = require('./lib/data/cluster-identifier.js');

const events1 = [
    { id: '1', topic: 'Climate' }
];
const events2 = JSON.parse(JSON.stringify(events1));

identifyClusters(events1);

console.log("Original events1:", JSON.stringify(events2, null, 2));
console.log("Mutated events1:", JSON.stringify(events1, null, 2));
