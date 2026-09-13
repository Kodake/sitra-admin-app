const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const hooksDir = path.join('c:', 'Users', 'rflorentino', 'Desktop', 'src', 'sitra-app', 'src', 'hooks');
const componentsDir = path.join('c:', 'Users', 'rflorentino', 'Desktop', 'src', 'sitra-app', 'src', 'components');

const hookFilesWithBtnDisable = [];
walkDir(hooksDir, (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('setBtnDisable')) {
            hookFilesWithBtnDisable.push(filePath);
        }
    }
});

const componentFiles = [];
walkDir(componentsDir, (filePath) => {
    if (filePath.endsWith('.tsx')) {
        componentFiles.push(filePath);
    }
});

let modifiedHooksCount = 0;
let modifiedComponentsCount = 0;

hookFilesWithBtnDisable.forEach(hookPath => {
    // Skip the ones already done manually
    if (hookPath.includes('useSaleInvoices.tsx') || hookPath.includes('usePurchaseInvoices.tsx')) {
        return;
    }

    let hookContent = fs.readFileSync(hookPath, 'utf8');
    const hookNameMatch = hookContent.match(/const (use[A-Za-z0-9_]+) =/);
    if (!hookNameMatch) return;
    const hookName = hookNameMatch[1];
    
    // Fix hook: prepend if (isBtnDisable) return; to setBtnDisable(true)
    if (!hookContent.includes('if (isBtnDisable) return;')) {
        // Find setBtnDisable(true); or setBtnDisable(true)
        hookContent = hookContent.replace(/([ \t]*)setBtnDisable\(true\);?/g, '$1if (isBtnDisable) return;\n$1setBtnDisable(true);');
        fs.writeFileSync(hookPath, hookContent, 'utf8');
        modifiedHooksCount++;
    }

    // Find and fix components that use this hook
    componentFiles.forEach(compPath => {
        // skip already done
        if (compPath.includes('CreatePosInvoice.tsx') || compPath.includes('CreatePurchaseInvoice.tsx')) {
            return;
        }

        let compContent = fs.readFileSync(compPath, 'utf8');
        if (compContent.includes(hookName)) {
            let originalCompContent = compContent;

            // 1. Ensure isBtnDisable is destructured
            if (!compContent.includes('isBtnDisable,')) {
                // regex to match destructuring
                const destructureRegex = new RegExp(`const\\s*{\\s*([\\s\\S]*?)}\\s*=\\s*${hookName}\\(`);
                compContent = compContent.replace(destructureRegex, `const {\n    isBtnDisable,\n$1} = ${hookName}(`);
            }

            // 2. Add classes to the submit button
            // match class="inventual-btn" or className="inventual-btn" inside <button type="submit"
            // Actually it's easier to just match className="inventual-btn" specifically near <button type="submit"
            // Or just globally replace className="inventual-btn" inside <button type="submit" block
            const buttonRegex = /(<button[^>]*type="submit"[^>]*)>/g;
            compContent = compContent.replace(buttonRegex, (match, p1) => {
                let updated = p1;
                if (!updated.includes('disabled:opacity-50')) {
                    updated = updated.replace(/className="inventual-btn"/, 'className="inventual-btn disabled:opacity-50 disabled:cursor-not-allowed"');
                }
                if (!updated.includes('disabled={isBtnDisable}')) {
                    updated = updated + ' disabled={isBtnDisable}';
                }
                return updated + '>';
            });

            if (originalCompContent !== compContent) {
                fs.writeFileSync(compPath, compContent, 'utf8');
                modifiedComponentsCount++;
            }
        }
    });
});

console.log(`Modified Hooks: ${modifiedHooksCount}`);
console.log(`Modified Components: ${modifiedComponentsCount}`);
