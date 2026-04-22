const fs = require('fs');
let claude = fs.readFileSync('CLAUDE.md', 'utf8');

const updatedTable = `## Component Status
| Component | Status | Notes |
| :--- | :--- | :--- |
| \`docs/architecture/system_design.md\` | [BUILT] | Architecture updated |
| \`docs/planning/backlog.md\` | [BUILT] | Backlog updated |
| \`docs/rules/standards.md\` | [BUILT] | Documentation depth flattened |
| \`lib/schema/*.js\` | [BUILT] | 11 JSON Schema draft 7 schemas |
| \`lib/data/*.js\` | [BUILT] | Pipeline modules, pure API clients |
| \`lib/timeline/*.js\` | [BUILT] | Temporal intelligence core |
| \`functions/worker.js\` | [BUILT] | CF Worker edge handler |
| \`src/\` (Frontend) | [GAP] | Blocked by Phase 4 UI bootstrap |
| \`tests/*.test.js\` | [BUILT] | 1:1 Coverage with strict mirroring |
| \`package.json\` | [BUILT] | Test script mapped to node runtime |
| \`script/*.js\` | [BUILT] | Automation scripts |`;

claude = claude.replace(/## Component Status[\s\S]*?\| `script\/\*\.js` \| \[BUILT\] \| Automation scripts \|/, updatedTable);
fs.writeFileSync('CLAUDE.md', claude);
