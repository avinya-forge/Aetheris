/**
 * SSOT Documentation Generator — Updates documentation based on code reality.
 */

const fs = require('fs');
const path = require('path');

/**
 * Populate missing required documents with a default header.
 */
function populateMissingDocs(rootDir, state) {
  state.forEach(doc => {
    if (!doc.exists) {
      const fullPath = path.join(rootDir, doc.path);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const filename = path.basename(doc.path);
      fs.writeFileSync(fullPath, `# ${filename}\n`);
    }
  });
}

/**
 * Update the pulse table in README.md
 * Expected stats format: { version: '0.1.8', phase: '1-Strategy', status: 'Active Focus', debt: '33%' }
 */
function updatePulseTable(readmeContent, stats) {
  if (!stats) return readmeContent;

  const pulseTableRegex = /(\|\s*Milestone\s*\|\s*Ver\s*\|\s*Phase\s*\|\s*Status\s*\|\s*Debt%\s*\|[\s\S]*?)(?=\n\n|\n##|$)/i;

  const newRow = `| Alpha Launch | ${stats.version} | ${stats.phase} | ${stats.status} | ${stats.debt} |`;

  const header = `| Milestone | Ver | Phase | Status | Debt% |
| :--- | :--- | :--- | :--- | :--- |
${newRow}`;

  if (pulseTableRegex.test(readmeContent)) {
    return readmeContent.replace(pulseTableRegex, header);
  } else {
    // If the table doesn't exist but a header does, we can append it, otherwise just return original
    if (readmeContent.includes('## Pulse Table')) {
        return readmeContent.replace('## Pulse Table', `## Pulse Table\n${header}`);
    }
  }
  return readmeContent;
}

module.exports = { updatePulseTable, populateMissingDocs };

export {};
