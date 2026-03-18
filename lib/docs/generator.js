const fs = require('fs');
const path = require('path');

/**
 * Generates missing documentation files based on the parsed state.
 *
 * @param {string} rootDir - The root directory of the project
 * @param {Array<{path: string, exists: boolean}>} state - The output from parseDocsState
 */
function populateMissingDocs(rootDir, state) {
  for (const doc of state) {
    if (!doc.exists) {
      const fullPath = path.join(rootDir, doc.path);
      const dirName = path.dirname(fullPath);

      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
      }

      const fileName = path.basename(doc.path);
      const defaultContent = `# ${fileName}\n`;
      fs.writeFileSync(fullPath, defaultContent, 'utf8');
    }
  }
}

module.exports = { populateMissingDocs };
