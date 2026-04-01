const fs = require('fs');
const path = require('path');

const DEFAULT_REQUIRED_DOCS = [
  'docs/backlog/index.md',
  'docs/core/roadmap.md',
  'docs/core/system_design.md',
  'docs/core/conventions.md'
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
