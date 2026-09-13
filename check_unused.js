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

const unused = [];
const missingClasses = [];
const fixedClassesFiles = [];

walkDir(componentsDir, (filePath) => {
  if (!filePath.endsWith('.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // 1. Check for unused isBtnDisable
  if (content.includes('isBtnDisable') && !content.includes('disabled={isBtnDisable}') && !content.match(/disabled=\{[^}]*isBtnDisable[^}]*\}/)) {
    // Make sure it actually destructures isBtnDisable
    if (content.match(/\{\s*[^}]*isBtnDisable[^}]*\s*\}/)) {
      unused.push(path.relative(componentsDir, filePath));
    }
  }

  // 2. Fix missing disabled classes on submit buttons that have disabled={isBtnDisable} or disabled={...isBtnDisable...}
  // The user wants: "disabled:opacity-50 disabled:cursor-not-allowed" on buttons.
  
  // We'll look for `<button ...>` tags that are submit buttons
  const buttonRegex = /<button([^>]*)>/g;
  let changed = false;
  
  content = content.replace(buttonRegex, (match, attrs) => {
    // Only target submit buttons that have isBtnDisable
    if (attrs.includes('type="submit"') && (attrs.includes('isBtnDisable') || attrs.includes('disabled='))) {
      let newAttrs = attrs;
      
      // Check if it already has the classes
      if (!newAttrs.includes('disabled:opacity-50') || !newAttrs.includes('disabled:cursor-not-allowed')) {
        changed = true;
        
        // If there's a className attribute, inject into it
        if (newAttrs.includes('className="')) {
          newAttrs = newAttrs.replace('className="', 'className="disabled:opacity-50 disabled:cursor-not-allowed ');
        } else if (newAttrs.includes('className={')) {
           // Complex className
           // Let's just append className="disabled:opacity-50 disabled:cursor-not-allowed" safely?
           // No, we might conflict. If className={`inventual-btn ...`}
           newAttrs = newAttrs.replace(/className=\{`([^`]+)`\}/, 'className={`$1 disabled:opacity-50 disabled:cursor-not-allowed`}');
           // If it's className={"..."}
           newAttrs = newAttrs.replace(/className=\{"([^"]+)"\}/, 'className={"$1 disabled:opacity-50 disabled:cursor-not-allowed"}');
        } else {
          // No className, add it
          newAttrs += ' className="disabled:opacity-50 disabled:cursor-not-allowed"';
        }
      }
      
      // Also ensure it has disabled={isBtnDisable} if it doesn't already have disabled attribute
      // But only if we know this file has isBtnDisable!
      if (content.includes('isBtnDisable') && !newAttrs.includes('disabled=')) {
          newAttrs += ' disabled={isBtnDisable}';
          changed = true;
      }

      return `<button${newAttrs}>`;
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedClassesFiles.push(path.relative(componentsDir, filePath));
  }
});

console.log('--- Unused isBtnDisable ---');
console.log(unused.join('\n') || 'None');

console.log('\n--- Fixed Classes On Buttons ---');
console.log(fixedClassesFiles.join('\n') || 'None');

