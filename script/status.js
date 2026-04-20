const fs = require('fs');
const path = require('path');

const backlogPath = path.join(__dirname, '..', 'docs', 'planning', 'backlog.md');

if (!fs.existsSync(backlogPath)) {
  console.log('Error: docs/planning/backlog.md not found.');
  process.exit(1);
}

const content = fs.readFileSync(backlogPath, 'utf8');
const pending = (content.match(/\[ \] TASK/g) || []).length;
const completed = (content.match(/\[x\] TASK/g) || []).length;

console.log('Project Status: Aetheris');
console.log('------------------------');
console.log(`Pending Tasks:   ${pending}`);
console.log(`Completed Tasks: ${completed}`);
console.log('------------------------');
