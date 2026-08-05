const fs = require('fs');

// 1. Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// 2. Extract Sobre section
const sobreStart = html.indexOf('<!-- ═══════════════════════ SOBRE ═══════════════════════ -->');
const footerStart = html.indexOf('<!-- ═══════════════════════ FOOTER ═══════════════════════ -->');
const sobreHtml = html.substring(sobreStart, footerStart);

// Remove Sobre from index
html = html.substring(0, sobreStart) + html.substring(footerStart);

// 3. Update top nav in index.html
const oldNav = `<ul class="nav-links" id="navLinks">
        <li><a href="#inicio" class="nav-link">Início</a></li>
        <li><a href="#artigos" class="nav-link">Artigos</a></li>
        <li><a href="#ferramentas" class="nav-link">Ferramentas</a></li>
        <li><a href="#recentes" class="nav-link">Recentes</a></li>
        <li><a href="#sobre" class="nav-link">Sobre</a></li>
      </ul>
      <a href="#newsletter" class="nav-cta" id="nav-newsletter-btn">Newsletter</a>`;

const newNav = `<ul class="nav-links" id="navLinks">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="sobre.html" class="nav-link">Sobre</a></li>
        <li><a href="index.html#recentes" class="nav-link">Blog</a></li>
        <li><a href="index.html#ferramentas" class="nav-link">Ferramentas</a></li>
        <li><a href="#footer" class="nav-link">Contato</a></li>
      </ul>`;

html = html.replace(oldNav, newNav);
// Replace other instances just in case formatting differs slightly:
html = html.replace(/<ul class="nav-links" id="navLinks">.*?<\/ul>\s*<a href="#newsletter" class="nav-cta"[^>]*>Newsletter<\/a>/s, newNav);

// 4. Update 'Ver Todos os Artigos'
html = html.replace('<a href="#" class="btn btn-outline-dark" id="ver-todos-artigos">Ver Todos os Artigos</a>', '<a href="#recentes" class="btn btn-outline-dark" id="ver-todos-artigos">Ver Todos os Artigos</a>');
html = html.replace('<a href="#" class="btn btn-outline-dark" id="ver-mais-artigos">Ver Mais Artigos</a>', '<a href="#recentes" class="btn btn-outline-dark" id="ver-mais-artigos">Ver Mais Artigos</a>');

fs.writeFileSync('index.html', html);

// 5. Create sobre.html
let sobrePage = html;
// Replace main content with Sobre
const mainStart = html.indexOf('<main id="inicio">');
const mainEnd = html.indexOf('</main>') + 7;
// We'll replace <main ...>...</main> with a new <main> containing the Sobre section.
let sobrePageBody = `
<main style="padding-top: 100px; padding-bottom: 80px;">
` + sobreHtml + `
</main>
`;
sobrePage = sobrePage.replace(html.substring(mainStart, mainEnd), sobrePageBody);

fs.writeFileSync('sobre.html', sobrePage);
console.log("Pages generated");

