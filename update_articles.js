const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'artigos');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));

const oldNavRegex = /<ul class="nav-links" id="navLinks">.*?<\/ul>\s*<a href="\.\.\/index\.html#newsletter" class="nav-cta"[^>]*>Newsletter<\/a>/s;

const newNav = `<ul class="nav-links" id="navLinks">
        <li><a href="../index.html" class="nav-link">Home</a></li>
        <li><a href="../sobre.html" class="nav-link">Sobre</a></li>
        <li><a href="../index.html#recentes" class="nav-link">Blog</a></li>
        <li><a href="../index.html#ferramentas" class="nav-link">Ferramentas</a></li>
        <li><a href="#footer" class="nav-link">Contato</a></li>
      </ul>`;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(oldNavRegex, newNav);
  fs.writeFileSync(filePath, html);
});

console.log("Articles updated");
