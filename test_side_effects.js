const { analyzeClusters } = require('./lib/data/cluster-analyzer.js');

const events1 = [
    { text: 'A', keywords: ['trade', 'economics'] },
    { text: 'B', keywords: ['trade', 'politics'] }
];
const events2 = JSON.parse(JSON.stringify(events1));

analyzeClusters(events1);

console.log("Original events1:", JSON.stringify(events2, null, 2));
console.log("Mutated events1:", JSON.stringify(events1, null, 2));
