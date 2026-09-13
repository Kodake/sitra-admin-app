const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let classFixCount = 0;
let addedDisabledCount = 0;

walkDir(componentsDir, (filePath) => {
  if (!filePath.endsWith('.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const hasIsBtnDisable = content.includes('isBtnDisable');
  
  // We'll look for `<button ...>` tags that are submit buttons
  const buttonRegex = /<button([^>]*)>/g;
  let changed = false;
  
  content = content.replace(buttonRegex, (match, attrs) => {
    if (attrs.includes('type="submit"')) {
      let newAttrs = attrs;
      let modifiedButton = false;
      
      // 1. Check if it already has the classes
      if (!newAttrs.includes('disabled:opacity-50') || !newAttrs.includes('disabled:cursor-not-allowed')) {
        modifiedButton = true;
        // If there's a className attribute, inject into it
        if (newAttrs.includes('className="')) {
          newAttrs = newAttrs.replace('className="', 'className="disabled:opacity-50 disabled:cursor-not-allowed ');
        } else if (newAttrs.includes('className={')) {
           newAttrs = newAttrs.replace(/className=\{`([^`]+)`\}/, 'className={`$1 disabled:opacity-50 disabled:cursor-not-allowed`}');
           newAttrs = newAttrs.replace(/className=\{"([^"]+)"\}/, 'className={"$1 disabled:opacity-50 disabled:cursor-not-allowed"}');
        } else {
          newAttrs += ' className="disabled:opacity-50 disabled:cursor-not-allowed"';
        }
      }
      
      // 2. Ensure it has disabled={isBtnDisable} if it doesn't already have it, AND we have isBtnDisable in the file
      if (hasIsBtnDisable && !newAttrs.includes('isBtnDisable')) {
          if (!newAttrs.includes('disabled=')) {
              newAttrs += ' disabled={isBtnDisable}';
              modifiedButton = true;
          } else {
              // It has a disabled attribute but not isBtnDisable
              // For example disabled={something} -> disabled={something || isBtnDisable}
              // This is a bit risky with regex, let's just append it manually later if needed, 
              // but mostly we found buttons with no disabled or disabled={isBtnDisable}
          }
      }

      if (modifiedButton) {
          changed = true;
          return `<button${newAttrs}>`;
      }
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    classFixCount++;
    console.log(`FIXED: ${path.relative(componentsDir, filePath)}`);
  }
});

console.log(`\nTotal files fixed: ${classFixCount}`);
