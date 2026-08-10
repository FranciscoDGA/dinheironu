const fs = require('fs');
const path = require('path');

const newFooterRoot = `
  <!-- ═══════════════════════ FOOTER ═══════════════════════ -->
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer-grid">

        <div class="footer-col">
          <h4 class="footer-col-title" style="color: var(--white); font-size: 1.1rem; text-transform: none; letter-spacing: normal;">Sobre o Site</h4>
          <p class="footer-tagline" style="margin-top: 16px;">Fazendo Dinheiro é um portal dedicado à educação financeira para brasileiros, oferecendo conteúdo gratuito e de qualidade sobre economia pessoal, investimentos e finanças.</p>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title" style="color: var(--white); font-size: 1.1rem; text-transform: none; letter-spacing: normal;">Links Úteis</h4>
          <div class="footer-links-grid" style="margin-top: 16px;">
            <ul class="footer-links">
              <li><a href="index.html" id="footer-link-inicio">Início</a></li>
              <li><a href="ferramentas.html" id="footer-link-ferramentas">Ferramentas</a></li>
              <li><a href="contato.html" id="footer-link-contato">Contato</a></li>
            </ul>
            <ul class="footer-links">
              <li><a href="sobre.html" id="footer-link-sobre">Sobre Nós</a></li>
              <li><a href="privacidade.html" id="footer-link-privacidade">Política de Privacidade</a></li>
              <li><a href="termos.html" id="footer-link-termos">Termos de Uso</a></li>
              <li><a href="cookies.html" id="footer-link-cookies">Política de Cookies</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title" style="color: var(--white); font-size: 1.1rem; text-transform: none; letter-spacing: normal;">Artigos Principais</h4>
          <ul class="footer-links" style="margin-top: 16px;">
            <li><a href="artigos/orcamento.html" id="footer-link-orcamento">Orçamento Pessoal</a></li>
            <li><a href="artigos/investimentos.html" id="footer-link-investir">Investimentos</a></li>
            <li><a href="artigos/dividas.html" id="footer-link-dividas">Impostos</a></li>
            <li><a href="artigos/tesouro.html" id="footer-link-tesouro">Crédito</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom" style="flex-direction: column; text-align: center; justify-content: center; border-top: 1px solid rgba(255,255,255,.08); padding-top: 32px;">
        <p class="footer-disclaimer" style="margin-bottom: 8px;">Este site tem caráter informativo e educativo. Não constitui recomendação ou aconselhamento financeiro profissional.</p>
        <p>© 2026 Fazendo Dinheiro. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>`;

const newFooterNested = newFooterRoot
  .replace(/href="sobre\.html"/g, 'href="../sobre.html"')
  .replace(/href="index\.html/g, 'href="../index.html')
  .replace(/href="privacidade\.html"/g, 'href="../privacidade.html"')
  .replace(/href="termos\.html"/g, 'href="../termos.html"')
  .replace(/href="cookies\.html"/g, 'href="../cookies.html"')
  .replace(/href="glossario\.html"/g, 'href="../glossario.html"')
  .replace(/href="guia\.html"/g, 'href="../guia.html"')
  .replace(/href="ferramentas\.html"/g, 'href="../ferramentas.html"')
  .replace(/href="contato\.html"/g, 'href="../contato.html"')
  .replace(/href="artigos\//g, 'href="');

function replaceFooter(filePath, newFooter) {
  let content = fs.readFileSync(filePath, 'utf8');
  const regex = /(?:<!-- ═══════════════════════ FOOTER ═══════════════════════ -->\s*)?<footer[\s\S]*?<\/footer>/;
  content = content.replace(regex, newFooter);
  fs.writeFileSync(filePath, content);
}

replaceFooter('index.html', newFooterRoot);
replaceFooter('sobre.html', newFooterRoot);
replaceFooter('privacidade.html', newFooterRoot);
replaceFooter('termos.html', newFooterRoot);
replaceFooter('cookies.html', newFooterRoot);
replaceFooter('glossario.html', newFooterRoot);
replaceFooter('guia.html', newFooterRoot);
replaceFooter('ferramentas.html', newFooterRoot);
replaceFooter('contato.html', newFooterRoot);
replaceFooter('busca.html', newFooterRoot);

const artigosDir = 'artigos';
fs.readdirSync(artigosDir).forEach(file => {
  if (file.endsWith('.html')) replaceFooter(path.join(artigosDir, file), newFooterNested);
});

console.log("Footers merged to 3 columns globally.");
