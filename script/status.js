const fs = require('fs');
const path = require('path');

const backlogPath = path.join(__dirname, '..', 'docs', 'backlog.md');

if (!fs.existsSync(backlogPath)) {
  console.log('Error: docs/backlog.md not found.');
  process.exit(1);
}

const content = fs.readFileSync(backlogPath, 'utf8');
const pending = (content.match(/^[ \t]*- \[ \] TASK/gm) || []).length;
const completed = (content.match(/^[ \t]*- \[x\] TASK/gm) || []).length;

console.log('Project Status: Aetheris');
console.log('------------------------');
console.log(`Pending Tasks:   ${pending}`);
console.log(`Completed Tasks: ${completed}`);
console.log('------------------------');
