const fs = require('fs');

const files = fs.readdirSync('c:/Users/rflorentino/Desktop/POC/src/sitra-app/src/components/', {recursive: true}).filter(f => f.endsWith('List.tsx'));
files.forEach(f => {
  const fullPath = 'c:/Users/rflorentino/Desktop/POC/src/sitra-app/src/components/' + f;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Remove setSearchTerm from usePermissions if it exists
  if (content.includes('setSearchTerm') && content.includes('usePermissions()')) {
      content = content.replace(/setSearchTerm,\s*([\s\S]*?)(\}\s*=\s*usePermissions\(\);)/, '$1$2');
  }

  // Now, inject setSearchTerm into the main useHooks
  if (!content.match(/setSearchTerm[\s\S]*?=\s*use(?!Permissions)/)) {
      content = content.replace(/(const\s+\{[\s\S]*?)(t,|g,|rowsPerPage,|page,)/, '$1setSearchTerm,\n    $2');
  }

  fs.writeFileSync(fullPath, content);
  console.log('fixed', f);
});

// Also fix usePermissions.tsx
let upPath = 'c:/Users/rflorentino/Desktop/POC/src/sitra-app/src/hooks/administrativeTools/usePermissions.tsx';
let upContent = fs.readFileSync(upPath, 'utf8');
upContent = upContent.replace(/,\s*searchTerm,\s*setSearchTerm/g, '');
upContent = upContent.replace(/searchTerm,\s*setSearchTerm/g, '');
fs.writeFileSync(upPath, upContent);
