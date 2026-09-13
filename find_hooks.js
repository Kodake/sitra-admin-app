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

const plan = [];

hookFilesWithBtnDisable.forEach(hookPath => {
    const hookContent = fs.readFileSync(hookPath, 'utf8');
    const hookNameMatch = hookContent.match(/const (use[A-Za-z0-9_]+) =/);
    if (!hookNameMatch) return;
    const hookName = hookNameMatch[1];
    
    const matchingComponents = [];
    componentFiles.forEach(compPath => {
        const compContent = fs.readFileSync(compPath, 'utf8');
        if (compContent.includes(hookName)) {
            matchingComponents.push(compPath);
        }
    });

    plan.push({
        hook: hookPath,
        hookName: hookName,
        components: matchingComponents
    });
});

console.log(JSON.stringify(plan, null, 2));
