const fs = require('fs');
const path = require('path');

// 1. Create contato.html
let base = fs.readFileSync('sobre.html', 'utf8');
const mainRegex = /(<main[^>]*>)([\s\S]*?)(<\/main>)/i;
let contatoContent = `
  <section class="section">
    <div class="container" style="max-width: 800px; margin: 0 auto; background: var(--white); padding: 56px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid rgba(15,23,42,.06); text-align: center;">
      <h1 style="margin-bottom: 24px; font-size: 2.5rem; color: var(--text-dark); font-weight: 800;">Fale Conosco</h1>
      <p style="margin-bottom: 40px; font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">Tem alguma dúvida, sugestão ou quer relatar um problema? O nosso time de redação está pronto para te ajudar. Basta enviar um e-mail para o endereço abaixo e retornaremos o mais rápido possível.</p>
      
      <div style="display: inline-flex; align-items: center; gap: 16px; background: rgba(37, 99, 235, 0.05); padding: 24px 40px; border-radius: 12px; border: 1px solid rgba(37, 99, 235, 0.1);">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M4 7l8 5.333L20 7M4 17h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H4C2.9 2 2 2.9 2 4v10c0 1.1.9 2 2 2z" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div style="text-align: left;">
          <span style="display: block; font-size: 0.875rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Nosso E-mail Oficial</span>
          <a href="mailto:contato@dinheironu.com.br" style="font-size: 1.25rem; font-weight: 700; color: var(--text-dark);">contato@dinheironu.com.br</a>
        </div>
      </div>
      
      <p style="margin-top: 40px; font-size: 0.95rem; color: var(--text-muted);">Respondemos em até 48 horas úteis.</p>
    </div>
  </section>
`;
let newHtml = base.replace(mainRegex, `$1\n${contatoContent}\n$3`);
newHtml = newHtml.replace(/<title>.*?<\/title>/, '<title>Contato | Dinheiro Nu</title>');
fs.writeFileSync('contato.html', newHtml);
console.log("contato.html created");


// 2. Append Cookie Banner CSS to style.css
let css = fs.readFileSync('css/style.css', 'utf8');
const cookieCss = `
/* ══════════════════════════════════════════════════════
   COOKIE BANNER
══════════════════════════════════════════════════════ */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--navy-900);
  color: #fff;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 -10px 25px -5px rgba(0,0,0,0.2);
  z-index: 9999;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.cookie-banner.show {
  transform: translateY(0);
}
.cookie-banner p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(255,255,255,0.8);
  text-align: center;
}
.cookie-banner p a {
  color: var(--gold);
  text-decoration: underline;
}
.cookie-btn {
  background: var(--gold);
  color: var(--navy-900);
  border: none;
  padding: 10px 24px;
  font-weight: 700;
  border-radius: var(--radius-sm);
  cursor: pointer;
  white-space: nowrap;
}
@media (min-width: 768px) {
  .cookie-banner {
    flex-direction: row;
    padding: 20px 40px;
  }
  .cookie-banner p {
    text-align: left;
  }
}
`;
if (!css.includes('.cookie-banner')) {
  fs.writeFileSync('css/style.css', css + '\n' + cookieCss);
}


// 3. Append Cookie Banner JS to js/main.js
let jsContent = fs.readFileSync('js/main.js', 'utf8');
const cookieJs = `
// Cookie Consent Banner (LGPD)
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('dinheironu_cookie_consent')) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    // Find absolute path to privacidade.html based on current location
    const inArtigos = window.location.pathname.includes('/artigos/');
    const privLink = inArtigos ? '../privacidade.html' : 'privacidade.html';
    
    banner.innerHTML = \`
      <p>Este site usa cookies de análise para garantir que você obtenha a melhor experiência. Ao continuar navegando, você concorda com a nossa <a href="\${privLink}">Política de Privacidade</a>.</p>
      <button class="cookie-btn" id="accept-cookies">Concordar e Fechar</button>
    \`;
    document.body.appendChild(banner);
    
    // trigger animation
    setTimeout(() => banner.classList.add('show'), 500);
    
    document.getElementById('accept-cookies').addEventListener('click', () => {
      localStorage.setItem('dinheironu_cookie_consent', 'true');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    });
  }
});
`;
if (!jsContent.includes('dinheironu_cookie_consent')) {
  fs.writeFileSync('js/main.js', jsContent + '\n' + cookieJs);
}


// 4. Global Find and Replace in all HTML files
function processFile(filePath, isArticle) {
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Replace author name
  html = html.replace(/Equipe DN/g, 'Francisco Gomes');
  
  // Replace Contact link
  if (isArticle) {
    html = html.replace(/href="\.\.\/#footer"[^>]*>Contato<\/a>/g, 'href="../contato.html">Contato</a>');
  } else {
    html = html.replace(/href="#footer"[^>]*>Contato<\/a>/g, 'href="contato.html">Contato</a>');
  }
  
  fs.writeFileSync(filePath, html);
}

const rootFiles = ['index.html', 'sobre.html', 'privacidade.html', 'termos.html', 'glossario.html', 'guia.html', 'contato.html'];
rootFiles.forEach(f => processFile(f, false));

const artigosDir = 'artigos';
fs.readdirSync(artigosDir).forEach(file => {
  if (file.endsWith('.html')) processFile(path.join(artigosDir, file), true);
});

console.log("All AdSense requirements implemented globally.");
