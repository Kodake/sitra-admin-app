const fs = require('fs');
const path = require('path');

const hooksDir = path.join(__dirname, 'src', 'hooks');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let modifiedCount = 0;

walkDir(hooksDir, (filePath) => {
  if (!filePath.endsWith('.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('setOpenPdf(false);') && content.includes('setBtnDisable')) {
    // Inject setBtnDisable(false); right after setOpenPdf(false); if not already there
    if (!content.includes('setBtnDisable(false);') || content.indexOf('setBtnDisable(false);') < content.indexOf('setOpenPdf(false);')) {
      const original = content;
      // We'll replace setOpenPdf(false); with setOpenPdf(false);\n      setBtnDisable(false);
      // Let's use a regex to preserve indentation
      content = content.replace(/([ \t]*)setOpenPdf\(false\);/g, '$1setOpenPdf(false);\n$1setBtnDisable(false);');
      
      if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${path.relative(hooksDir, filePath)}`);
        modifiedCount++;
      }
    }
  }
});

console.log(`\nFixed ${modifiedCount} files.`);
