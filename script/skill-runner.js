import { analyzeSkills } from '../lib/skill-analyzer.js';

console.log('Running Aetheris Skill Analyzer & Lifecycle Audit...');
const report = analyzeSkills();

console.log(`Total Skills Discovered: ${report.totalSkillsFound}`);
console.log('Domain Audits:');
console.log(` - Meta Analyzer & Skill Registry: ${report.domainAudits.metaAnalyzer ? 'PASS' : 'FAIL'}`);
console.log(` - Coding Standards (SOLID/DRY):   ${report.domainAudits.codingStandards ? 'PASS' : 'FAIL'}`);
console.log(` - Security & OWASP Standards:     ${report.domainAudits.security ? 'PASS' : 'FAIL'}`);
console.log(` - Documentation SSOT Workflow:    ${report.domainAudits.docsWorkflow ? 'PASS' : 'FAIL'}`);

if (!report.isPassed) {
  console.error('Skill Analysis Failed! Check skill domain audits.');
  process.exit(1);
} else {
  console.log('All Skill Domain Audits Passed Successfully.');
}
