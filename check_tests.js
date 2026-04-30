const fs = require('fs');
const path = require('path');

const dirs = ['lib', 'functions', 'script'];

dirs.forEach(dir => {
  const checkDir = (currentPath) => {
    if (!fs.existsSync(currentPath)) return;
    const files = fs.readdirSync(currentPath);
    files.forEach(file => {
      const fullPath = path.join(currentPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        checkDir(fullPath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        const testFile = path.join('tests', `${basename}.test${ext}`);
        if (!fs.existsSync(testFile)) {
          console.log(`Missing test for ${fullPath} -> ${testFile}`);
        }
      }
    });
  };
  checkDir(dir);
});
