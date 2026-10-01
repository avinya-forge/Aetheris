import * as fs from 'fs';
import * as path from 'path';

export function analyzeSkills(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const agentsMdPath = path.join(rootDir, 'AGENTS.md');
  const skillsDir = path.join(rootDir, '.agents', 'skills');

  const skills = [];

  // 1. Parse skills from AGENTS.md
  if (fs.existsSync(agentsMdPath)) {
    const content = fs.readFileSync(agentsMdPath, 'utf-8');
    const matches = content.matchAll(/<!--\s*SKILL MODULE:\s*([\w-]+)\.md\s*-->/g);
    for (const match of matches) {
      skills.push({ name: match[1], source: 'AGENTS.md' });
    }
  }

  // 2. Parse skills from .agents/skills if exists
  if (fs.existsSync(skillsDir)) {
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        skills.push({ name: entry.name, source: '.agents/skills' });
      }
    }
  }

  // 3. Domain Audits
  const domainAudits = {
    metaAnalyzer: skills.length > 0,
    codingStandards: auditCodingStandards(rootDir),
    security: auditSecurity(rootDir),
    docsWorkflow: auditDocsWorkflow(rootDir),
  };

  const isPassed = Object.values(domainAudits).every(Boolean);

  return {
    totalSkillsFound: skills.length,
    skills,
    domainAudits,
    isPassed,
  };
}

function auditCodingStandards(rootDir) {
  const libDir = path.join(rootDir, 'lib');
  if (!fs.existsSync(libDir)) return false;

  const files = fs.readdirSync(libDir);
  for (const file of files) {
    if (!file.endsWith('.js') && !file.endsWith('.ts')) continue;
    const content = fs.readFileSync(path.join(libDir, file), 'utf-8');
    // Ensure no default exports in lib/ logic files
    if (content.match(/export\s+default\s+/)) return false;
  }
  return true;
}

function auditSecurity(rootDir) {
  const libDir = path.join(rootDir, 'lib');
  if (!fs.existsSync(libDir)) return false;

  const secretPatterns = ['AI' + 'za', 'sk-' + 'proj'];

  const files = fs.readdirSync(libDir);
  for (const file of files) {
    if (!file.endsWith('.js') && !file.endsWith('.ts')) continue;
    const content = fs.readFileSync(path.join(libDir, file), 'utf-8');
    for (const pattern of secretPatterns) {
      if (content.includes(pattern)) return false;
    }
  }
  return true;
}

function auditDocsWorkflow(rootDir) {
  const backlogPath = path.join(rootDir, 'docs', 'backlog.md');
  const releaseNotesPath = path.join(rootDir, 'docs', 'release-notes.md');
  const visionPath = path.join(rootDir, 'docs', 'vision.md');

  return (
    fs.existsSync(backlogPath) &&
    fs.existsSync(releaseNotesPath) &&
    fs.existsSync(visionPath)
  );
}
