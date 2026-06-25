const fs = require('fs');

let backlog = fs.readFileSync('docs/backlog.md', 'utf8');

backlog = backlog.replace('- [ ] TASK: ensure-client-io-purity | Target: lib/*-client.js | I/O: audit | Assert: all clients return raw JSON | LOC: ~30', '- [x] TASK: ensure-client-io-purity | Target: lib/*-client.js | I/O: audit | Assert: all clients return raw JSON | LOC: ~30');

fs.writeFileSync('docs/backlog.md', backlog);
