const fs = require('fs');
const path = require('path');

// ============================================================================
// PHASE 1: Fix components where isBtnDisable was wrongly injected into 
//           usePermissions() destructuring. Remove the bad injection and 
//           add it to the CORRECT hook destructuring instead.
// ============================================================================

const fixes = [
  // Components that need isBtnDisable from their actual hook (not usePermissions)
  {
    file: 'src/components/invoices/createNote/CreateNote.tsx',
    hook: 'useNotes',
    addToHook: true,
  },
  {
    file: 'src/components/invoices/createQuotation/CreateQuotation.tsx',
    hook: 'useQuotations',
    addToHook: true,
  },
  {
    file: 'src/components/invoices/editQuotation/EditQuotation.tsx',
    hook: 'useQuotations',
    addToHook: true,
  },
  // List components that should NOT have isBtnDisable at all 
  // (no submit button, they are list/display views)
  {
    file: 'src/components/invoices/quotationList/QuotationList.tsx',
    hook: null,
    addToHook: false,
  },
  {
    file: 'src/components/administrativeTools/fiscalSupportList/FiscalSupportList.tsx',
    hook: null,
    addToHook: false,
  },
  {
    file: 'src/components/appointments/appointmentList/AppointmentList.tsx',
    hook: null,
    addToHook: false,
  },
  {
    file: 'src/components/cashBoxes/pettyCashList/PettyCashList.tsx',
    hook: null,
    addToHook: false,
  },
  {
    file: 'src/components/contacts/contactList/ContactList.tsx',
    hook: null,
    addToHook: false,
  },
  {
    file: 'src/components/warehouses/stockList/StockList.tsx',
    hook: null,
    addToHook: false,
  },
  {
    file: 'src/components/warehouses/transferList/TransferList.tsx',
    hook: null,
    addToHook: false,
  },
  {
    file: 'src/components/warehouses/warehouseList/WarehouseList.tsx',
    hook: null,
    addToHook: false,
  },
];

const basePath = 'c:\\Users\\rflorentino\\Desktop\\src\\sitra-app\\';

fixes.forEach(fix => {
  const fullPath = basePath + fix.file;
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  // Step 1: Remove isBtnDisable from usePermissions() destructuring
  // Pattern: "const {\n    isBtnDisable,\n..." becomes "const {\n..."
  const before = content;
  content = content.replace(/const\s*\{\s*\n\s*isBtnDisable,\s*\n/g, 'const {\n');
  if (content !== before) changed = true;

  // Step 2: For components that need it, add isBtnDisable to the correct hook destructuring
  if (fix.addToHook && fix.hook) {
    // Only add if not already present in the hook destructuring
    const hookCallPattern = new RegExp(`} = ${fix.hook}\\(`);
    if (hookCallPattern.test(content) && !content.match(new RegExp(`isBtnDisable[,\\s]*\\n[^}]*} = ${fix.hook}\\(`))) {
      // Add isBtnDisable before the closing brace of the destructuring
      content = content.replace(
        new RegExp(`(\\s+onSubmit,\\n)(\\s*} = ${fix.hook}\\()`),
        `$1    isBtnDisable,\n$2`
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`FIXED: ${fix.file}`);
  } else {
    console.log(`ALREADY OK: ${fix.file}`);
  }
});

// ============================================================================
// PHASE 2: Now also ensure ALL submit buttons that reference isBtnDisable 
//           have the disabled CSS classes
// ============================================================================

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const componentsDir = basePath + 'src\\components';
let classFixCount = 0;

walkDir(componentsDir, (filePath) => {
  if (!filePath.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Find submit buttons that have disabled={isBtnDisable} but missing the disabled CSS classes
  content = content.replace(
    /(<button[^>]*type="submit"[^>]*className="inventual-btn"[^>]*disabled=\{isBtnDisable\}[^>]*>)/g,
    (match) => {
      return match.replace('className="inventual-btn"', 'className="inventual-btn disabled:opacity-50 disabled:cursor-not-allowed"');
    }
  );
  
  // Also handle the reverse order: disabled then className
  content = content.replace(
    /(<button[^>]*type="submit"[^>]*disabled=\{isBtnDisable\}[^>]*className="inventual-btn"[^>]*>)/g,
    (match) => {
      return match.replace('className="inventual-btn"', 'className="inventual-btn disabled:opacity-50 disabled:cursor-not-allowed"');
    }
  );
  
  // Also handle multi-line button patterns where className="inventual-btn" is on its own line
  // and disabled={isBtnDisable} is nearby
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('className="inventual-btn"') && lines[i].trim().startsWith('className=')) {
      // Check surrounding lines for disabled={isBtnDisable}
      const context = lines.slice(Math.max(0, i-5), Math.min(lines.length, i+5)).join('\n');
      if (context.includes('disabled={isBtnDisable}') && context.includes('type="submit"')) {
        lines[i] = lines[i].replace('className="inventual-btn"', 'className="inventual-btn disabled:opacity-50 disabled:cursor-not-allowed"');
      }
    }
  }
  content = lines.join('\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    classFixCount++;
    console.log(`CLASSES FIXED: ${path.relative(basePath, filePath)}`);
  }
});

console.log(`\nTotal class fixes: ${classFixCount}`);
