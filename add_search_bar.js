const fs = require('fs');
const path = require('path');

function injectSearch(filePath, isRoot) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Prevent duplicate injections
  if (content.includes('class="search-form"')) return;

  const actionPath = isRoot ? 'busca.html' : '../busca.html';
  const searchHtml = `
      <form action="${actionPath}" method="GET" class="search-form" style="display:flex; align-items:center; margin-left:16px;">
        <input type="text" name="q" placeholder="Buscar..." required style="padding:6px 12px; border-radius:4px; border:1px solid #cbd5e1; outline:none; font-size:0.9rem;" />
        <button type="submit" style="background:var(--primary); color:#fff; border:none; padding:6px 10px; border-radius:4px; margin-left:4px; cursor:pointer;">🔍</button>
      </form>
`;

  // Inject right after </ul> in navbar
  content = content.replace(/<\/ul>\s*(<button class="mobile-menu-btn")/i, `</ul>\n${searchHtml}      $1`);
  fs.writeFileSync(filePath, content);
}

const rootFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
rootFiles.forEach(f => injectSearch(f, true));

const artigosDir = 'artigos';
const artigoFiles = fs.readdirSync(artigosDir).filter(f => f.endsWith('.html'));
artigoFiles.forEach(f => injectSearch(path.join(artigosDir, f), false));

console.log('Search bar added to navbars!');
