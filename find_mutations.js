const fs = require('fs');
const files = fs.readdirSync('lib/data').filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync('lib/data/' + file, 'utf8');
  // Check for Object.assign without empty object first arg, or property assignments
  const lines = content.split('\n');
  lines.forEach((line, i) => {
      // Very naive checks
      if (line.match(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\s*=/)) {
          // ignore module.exports
          if (!line.includes('module.exports')) {
              console.log(file, i+1, line.trim());
          }
      }
      if (line.match(/\.push\(/)) {
          console.log(file, i+1, line.trim());
      }
  });
}
