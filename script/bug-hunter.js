import * as fs from 'fs';
import * as path from 'path';

export function runBugHunter(libDir, testsDir) {
  const issues = [];

  if (!fs.existsSync(libDir)) {
    return ["lib directory not found"];
  }

  const libFiles = fs.readdirSync(libDir);

  for (const file of libFiles) {
    if (!file.endsWith('.js') && !file.endsWith('.ts')) continue;

    const filePath = path.join(libDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Rule 1: No API keys (sk-, AIza)
    if (content.includes('AIza') || content.includes('sk-')) {
      issues.push(`Possible hardcoded secret in ${file}`);
    }

    // Rule 2: No export default in lib/
    if (content.match(/export\s+default\s+/)) {
      issues.push(`Illegal 'export default' found in ${file}`);
    }

    // Rule 3: 1:1 test coverage
    const baseName = path.parse(file).name;
    const testFileJs = path.join(testsDir, `${baseName}.test.js`);
    const testFileTs = path.join(testsDir, `${baseName}.test.ts`);
    const testFileTsx = path.join(testsDir, `${baseName}.test.tsx`);

    if (!fs.existsSync(testFileJs) && !fs.existsSync(testFileTs) && !fs.existsSync(testFileTsx)) {
      issues.push(`Missing test file for ${file}`);
    }
  }

  return issues;
}

// Auto-run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const rootDir = process.cwd();
  const libPath = path.join(rootDir, 'lib');
  const testPath = path.join(rootDir, 'tests');

  console.log("Running Automated Bug Hunter...");
  const issues = runBugHunter(libPath, testPath);

  if (issues.length > 0) {
    console.error("Bug Hunter found issues:");
    issues.forEach(issue => console.error(`- ${issue}`));
    process.exit(1);
  } else {
    console.log("Bug Hunter found 0 issues. Codebase is clean.");
  }
}
