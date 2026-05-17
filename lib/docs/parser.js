/**
 * SSOT Documentation Parser — Extracts structured data from Markdown.
 * Used by run.sh --backlog to verify repo state.
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_REQUIRED_DOCS = [
  'README.md',
  'docs/roadmap.md',
  'docs/backlog.md',
  'docs/system_design.md',
  'docs/standards.md'
];

/**
 * Audit the documentation state against a required list.
 */
function parseDocsState(rootDir, requiredDocs = DEFAULT_REQUIRED_DOCS) {
  return requiredDocs.map(docPath => {
    const fullPath = path.join(rootDir, docPath);
    return {
      path: docPath,
      exists: fs.existsSync(fullPath)
    };
  });
}

/**
 * Parse a backlog.md file and return a list of tasks.
 */
function parseBacklog(content) {
  const tasks = [];
  const lines = content.split('\n');

  // Pattern: - [ ] TASK: name | Target: path | ...
  const taskRegex = /- \[([ x])\] TASK: ([^|]+)\| Target: ([^|]+)/;

  for (const line of lines) {
    const match = line.match(taskRegex);
    if (match) {
      tasks.push({
        status: match[1] === 'x' ? 'done' : 'pending',
        id: match[2].trim(),
        target: match[3].trim()
      });
    }
  }

  return tasks;
}

module.exports = { parseBacklog, parseDocsState, DEFAULT_REQUIRED_DOCS };
