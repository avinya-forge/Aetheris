import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { analyzeSkills } from '../lib/skill-analyzer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function testSkillAnalyzer() {
  console.log('Testing Skill Analyzer...');

  // Test 1: Real codebase analysis
  const realResult = analyzeSkills();
  assert.ok(realResult.totalSkillsFound > 0, 'Should find skills in codebase');
  assert.strictEqual(realResult.isPassed, true, 'Real codebase should pass audits');

  // Test 2: Custom temp dir branches
  const tempDir = path.join(__dirname, 'temp_skill_analyzer');
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });

  // 2a. Missing lib & docs -> fails
  let tempResult = analyzeSkills({ rootDir: tempDir });
  assert.strictEqual(tempResult.domainAudits.codingStandards, false);
  assert.strictEqual(tempResult.domainAudits.security, false);
  assert.strictEqual(tempResult.domainAudits.docsWorkflow, false);
  assert.strictEqual(tempResult.isPassed, false);

  // 2b. Add lib dir with invalid export & secrets
  const tempLib = path.join(tempDir, 'lib');
  fs.mkdirSync(tempLib, { recursive: true });
  fs.writeFileSync(path.join(tempLib, 'bad.js'), 'export default function() {}');
  fs.writeFileSync(path.join(tempLib, 'secret.js'), 'const key = "AI' + 'zaSy123";');
  fs.writeFileSync(path.join(tempLib, 'readme.txt'), 'not js file');

  // Add docs
  const tempDocs = path.join(tempDir, 'docs');
  fs.mkdirSync(tempDocs, { recursive: true });
  fs.writeFileSync(path.join(tempDocs, 'backlog.md'), '# Backlog');
  fs.writeFileSync(path.join(tempDocs, 'release-notes.md'), '# Release Notes');
  fs.writeFileSync(path.join(tempDocs, 'vision.md'), '# Vision');

  tempResult = analyzeSkills({ rootDir: tempDir });
  assert.strictEqual(tempResult.domainAudits.codingStandards, false, 'Default export should fail coding standards');
  assert.strictEqual(tempResult.domainAudits.security, false, 'Secret pattern should fail security audit');
  assert.strictEqual(tempResult.domainAudits.docsWorkflow, true, 'Docs workflow should pass');

  // Clean up
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('PASS - skill-analyzer.test.ts');
}

try {
  testSkillAnalyzer();
} catch (e) {
  console.error('skill-analyzer.test.ts failed:', e);
  process.exit(1);
}
