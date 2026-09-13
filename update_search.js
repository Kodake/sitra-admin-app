const fs = require('fs');
const path = require('path');

function getFiles(dir, match) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file, match));
        } else if (file.match(match)) {
            results.push(file);
        }
    });
    return results;
}

const listFiles = getFiles('c:/Users/rflorentino/Desktop/POC/src/sitra-app/src/components', /List\.tsx$/);

listFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('TextField')) return;

    // 1. Add MUI imports if not exist
    if (!content.includes('InputAdornment')) {
        content = content.replace(/import\s+{([^}]+)}\s+from\s+["']@mui\/material["'];/, (match, p1) => {
            let imports = p1.split(',').map(s => s.trim());
            if (!imports.includes('InputAdornment')) imports.push('InputAdornment');
            if (!imports.includes('IconButton')) imports.push('IconButton');
            return `import { ${imports.join(', ')} } from "@mui/material";`;
        });
    }

    // 2. Add local state searchInput
    if (!content.includes('searchInput')) {
        // Find the start of the component body
        content = content.replace(/(const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{)/, `$1\n  const [searchInput, setSearchInput] = React.useState("");`);
    }

    // 3. Extract setSearchTerm from hook.
    if (!content.includes('setSearchTerm,')) {
        // e.g. const { t, g, page ... } = useProducts();
        content = content.replace(/(const\s+{\s*)([^}]+)(}\s*=\s*use\w+\(\);)/, (match, p1, p2, p3) => {
            return `${p1}setSearchTerm,\n    ${p2}${p3}`;
        });
    }

    // 4. Update the TextField block
    const textFieldRegex = /<TextField[\s\S]*?placeholder={g\("search"\)}[\s\S]*?InputLabelProps={{ shrink: true }}\s*\/>/g;
    
    const newTextField = `<TextField
                  placeholder={g("search")}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSearchTerm(searchInput); }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchInput && (
                          <IconButton onClick={() => { setSearchInput(''); setSearchTerm(''); }} edge="end" size="small" sx={{ mr: 0.5 }}>
                            <i className="fa-regular fa-xmark" style={{ fontSize: '1rem' }}></i>
                          </IconButton>
                        )}
                        <IconButton onClick={() => setSearchTerm(searchInput)} edge="end" size="small">
                          <i className="fa-regular fa-search" style={{ fontSize: '1rem' }}></i>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />`;
                
    content = content.replace(textFieldRegex, newTextField);

    fs.writeFileSync(file, content, 'utf8');
    console.log("Updated component:", file);
});

// Update Hooks
const hookFiles = getFiles('c:/Users/rflorentino/Desktop/POC/src/sitra-app/src/hooks', /use\w+\.tsx$/);
hookFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('useQuery')) return;
    
    let updated = false;

    // Add searchTerm state
    if (!content.includes('searchTerm')) {
        content = content.replace(/(\/\/ Local state\s*\n\s*const \[\w+,\s*set\w+\]\s*=\s*useState[^;]+;)/, `$1\n  const [searchTerm, setSearchTerm] = useState("");`);
        if (!content.includes('const [searchTerm, setSearchTerm]')) {
             // Fallback if "// Local state" is not found
             content = content.replace(/(const \[page,\s*setPage\]\s*=\s*useState[^;]+;)/, `$1\n  const [searchTerm, setSearchTerm] = useState("");`);
        }
        
        // Pass searchTerm to fetch calls.
        // We match fetchName({ ... }) or fetchName(page, rowsPerPage) inside useQuery
        content = content.replace(/await\s+(fetch\w+)\(\s*\{\s*page\s*,\s*recordsPerPage:\s*rowsPerPage\s*\}\s*\)/g, `await $1({ page, recordsPerPage: rowsPerPage, searchTerm })`);
        content = content.replace(/await\s+(fetch\w+)\(\s*page\s*,\s*rowsPerPage\s*\)/g, `await $1(page, rowsPerPage, searchTerm)`);

        // Export searchTerm and setSearchTerm
        content = content.replace(/(return\s+{[\s\S]*?)(\s*};)/, `$1,\n    searchTerm,\n    setSearchTerm$2`);

        // Update useQuery key: ["products", page, rowsPerPage] -> ["products", page, rowsPerPage, searchTerm]
        content = content.replace(/(\[\s*['"]\w+['"]\s*,\s*page\s*,\s*rowsPerPage\s*)\]/g, `$1, searchTerm]`);
        
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Updated hook:", file);
    }
});

// Update Services
const serviceFiles = getFiles('c:/Users/rflorentino/Desktop/POC/src/sitra-app/src/services', /\w+Services?\.tsx?$/);
serviceFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    let updated = false;

    // We look for fetchX functions that take page/recordsPerPage and add searchTerm
    content = content.replace(/(export\s+const\s+fetch\w+\s*=\s*async\s*\(\s*\{\s*page\s*,\s*recordsPerPage\s*\}\s*:\s*\{\s*page:\s*number;\s*recordsPerPage:\s*number\s*\}\s*\)\s*=>\s*\{[\s\S]*?params:\s*\{[^}]*)(\})/g, (match, p1, p2) => {
        if (p1.includes('searchTerm')) return match;
        updated = true;
        // Signature change
        let newMatch = match.replace(/\{\s*page\s*,\s*recordsPerPage\s*\}/, '{ page, recordsPerPage, searchTerm }');
        newMatch = newMatch.replace(/\{\s*page:\s*number;\s*recordsPerPage:\s*number\s*\}/, '{ page: number; recordsPerPage: number; searchTerm?: string }');
        return newMatch.replace(/(params:\s*\{[\s\S]*?)\}/, `$1, searchTerm: searchTerm || "" }`);
    });

    content = content.replace(/(export\s+const\s+fetch\w+\s*=\s*async\s*\(\s*page:\s*number,\s*recordsPerPage:\s*number\s*\)\s*=>\s*\{[\s\S]*?params:\s*\{[^}]*)(\})/g, (match, p1, p2) => {
        if (p1.includes('searchTerm')) return match;
        updated = true;
        let newMatch = match.replace(/\(\s*page:\s*number,\s*recordsPerPage:\s*number\s*\)/, '(page: number, recordsPerPage: number, searchTerm?: string)');
        return newMatch.replace(/(params:\s*\{[\s\S]*?)\}/, `$1, searchTerm: searchTerm || "" }`);
    });

    // Also handle params: { page, recordsPerPage } if it was just on one line
    content = content.replace(/(export\s+const\s+fetch\w+\s*=\s*async\s*\([\s\S]*?params:\s*\{\s*page,\s*recordsPerPage\s*)(\})/g, (match, p1, p2) => {
         if (p1.includes('searchTerm')) return match;
         updated = true;
         let newMatch = match.replace(/\{\s*page\s*,\s*recordsPerPage\s*\}/, '{ page, recordsPerPage, searchTerm }');
         newMatch = newMatch.replace(/\{\s*page:\s*number;\s*recordsPerPage:\s*number\s*\}/, '{ page: number; recordsPerPage: number; searchTerm?: string }');
         newMatch = newMatch.replace(/\(\s*page:\s*number,\s*recordsPerPage:\s*number\s*\)/, '(page: number, recordsPerPage: number, searchTerm?: string)');
         return newMatch.replace(/(params:\s*\{\s*page,\s*recordsPerPage\s*)(\})/, `$1, searchTerm: searchTerm || "" $2`);
    });

    if (updated) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Updated service:", file);
    }
});
