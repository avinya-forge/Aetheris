const fs = require('fs');
const path = require('path');

const DEFAULT_REQUIRED_DOCS = [
  'docs/planning/backlog.md',
  'docs/architecture/roadmap.md',
  'docs/architecture/system_design.md',
  'docs/rules/standards.md'
];

/**
 * Parses the state of the documentation directory.
 *
 * @param {string} rootDir - The root directory to check from
 * @param {string[]} [requiredDocs] - A list of relative paths to check
 * @returns {Array<{path: string, exists: boolean}>}
 */
function parseDocsState(rootDir, requiredDocs = DEFAULT_REQUIRED_DOCS) {
  return requiredDocs.map(docPath => {
    const fullPath = path.join(rootDir, docPath);
    const exists = fs.existsSync(fullPath);
    return {
      path: docPath,
      exists
    };
  });
}

module.exports = { parseDocsState };
