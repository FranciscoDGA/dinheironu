const fs = require('fs');
const path = require('path');

const newFooterRoot = `
  <!-- ═══════════════════════ FOOTER ═══════════════════════ -->
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer-grid">

        <div class="footer-brand">
          <a href="#" class="nav-logo footer-logo" id="footer-logo-link">
            <div class="logo-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#f59e0b" stroke-width="2"/><path d="M12 6v1m0 10v1M9 9.5C9 8.12 10.34 7 12 7s3 1.12 3 2.5c0 1.74-2 2.5-3 3.5" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16" r="0.8" fill="#f59e0b"/></svg>
            </div>
            <span class="logo-text">Dinheiro<span class="logo-accent">Nu</span></span>
          </a>
          <p class="footer-tagline">Dinheiro Nu é um portal dedicado à educação financeira para brasileiros, oferecendo conteúdo gratuito e de qualidade sobre economia pessoal, investimentos e finanças.</p>
          <div class="footer-social">
            <a href="#" class="social-btn" id="social-instagram" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" stroke-width="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </a>
            <a href="#" class="social-btn" id="social-youtube" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" stroke-width="2"/><polygon points="9.75,15.02 15.5,12 9.75,8.98" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
            </a>
            <a href="#" class="social-btn" id="social-twitter" aria-label="Twitter/X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M4 20L20 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Links Úteis</h4>
          <div class="footer-links-grid">
            <ul class="footer-links">
              <li><a href="index.html" id="footer-link-inicio">Início</a></li>
              <li><a href="index.html#ferramentas" id="footer-link-ferramentas">Ferramentas</a></li>
              <li><a href="#footer" id="footer-link-contato">Contato</a></li>
              <li><a href="sobre.html" id="footer-link-sobre">Sobre Nós</a></li>
            </ul>
            <ul class="footer-links">
              <li><a href="privacidade.html" id="footer-link-privacidade">Política de Privacidade</a></li>
              <li><a href="termos.html" id="footer-link-termos">Termos de Uso</a></li>
              <li><a href="glossario.html" id="footer-link-glossario">Glossário Financeiro</a></li>
              <li><a href="guia.html" id="footer-link-guia">Guia do Iniciante</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Artigos Principais</h4>
          <ul class="footer-links">
            <li><a href="artigos/orcamento.html" id="footer-link-orcamento">Orçamento Pessoal</a></li>
            <li><a href="artigos/investimentos.html" id="footer-link-investir">Investimentos Básicos</a></li>
            <li><a href="artigos/dividas.html" id="footer-link-dividas">Sair das Dívidas</a></li>
            <li><a href="artigos/tesouro.html" id="footer-link-tesouro">Tesouro Direto</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© 2026 <strong>Dinheiro Nu</strong>. Todos os direitos reservados.</p>
        <p class="footer-disclaimer">Este site tem caráter informativo e educativo. Não constitui recomendação ou aconselhamento financeiro profissional.</p>
      </div>
    </div>
  </footer>`;

const newFooterNested = newFooterRoot
  .replace(/href="sobre\.html"/g, 'href="../sobre.html"')
  .replace(/href="index\.html/g, 'href="../index.html')
  .replace(/href="privacidade\.html"/g, 'href="../privacidade.html"')
  .replace(/href="termos\.html"/g, 'href="../termos.html"')
  .replace(/href="glossario\.html"/g, 'href="../glossario.html"')
  .replace(/href="guia\.html"/g, 'href="../guia.html"')
  .replace(/href="artigos\//g, 'href="');

function replaceFooter(filePath, newFooter) {
  let content = fs.readFileSync(filePath, 'utf8');
  const regex = /<!-- ═══════════════════════ FOOTER ═══════════════════════ -->[\s\S]*?<\/footer>/;
  content = content.replace(regex, newFooter);
  fs.writeFileSync(filePath, content);
}

replaceFooter('index.html', newFooterRoot);
replaceFooter('sobre.html', newFooterRoot);
replaceFooter('privacidade.html', newFooterRoot);
replaceFooter('termos.html', newFooterRoot);
replaceFooter('glossario.html', newFooterRoot);
replaceFooter('guia.html', newFooterRoot);

const artigosDir = 'artigos';
fs.readdirSync(artigosDir).forEach(file => {
  if (file.endsWith('.html')) replaceFooter(path.join(artigosDir, file), newFooterNested);
});

console.log("Footers merged to 3 columns globally.");
