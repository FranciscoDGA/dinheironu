const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');

const headMatch = idx.match(/<!DOCTYPE html>[\s\S]*?<\/nav>/);
const footerMatch = idx.match(/<!-- ═══════════════════════ FOOTER ═══════════════════════ -->[\s\S]*?<\/html>/);

const sobreHtml = `
<main style="padding-top: 120px; padding-bottom: 80px;">
  <section class="section sobre" id="sobre">
    <div class="container">
      <div class="sobre-content">
        <div class="sobre-text">
          <span class="section-tag">Quem somos</span>
          <h2 class="section-title">Sobre o Dinheiro Nu</h2>
          <p>O <strong>Dinheiro Nu</strong> nasceu da frustração com conteúdos financeiros cheios de termos técnicos, planilhas complicadas e conselhos que só funcionam para quem já tem dinheiro.</p>
          <p>Aqui falamos de finanças do jeito que deveria ser: <strong>direto, honesto e sem enrolação</strong>. Sem produtos pra vender, sem cursos caros para empurrar. Só conteúdo de qualidade para ajudar você a tomar decisões financeiras melhores.</p>
          <p>Porque dinheiro não precisa ser mistério.</p>
          <div class="sobre-values">
            <div class="value-item">
              <span class="value-icon">🔍</span>
              <div>
                <strong>Transparência</strong>
                <span>Falamos a verdade, mesmo que doa</span>
              </div>
            </div>
            <div class="value-item">
              <span class="value-icon">🎯</span>
              <div>
                <strong>Praticidade</strong>
                <span>Só o que você pode aplicar hoje</span>
              </div>
            </div>
            <div class="value-item">
              <span class="value-icon">💙</span>
              <div>
                <strong>Gratuidade</strong>
                <span>100% grátis, sempre</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sobre-visual">
          <div class="sobre-card">
            <div class="sobre-card-header">
              <div class="sobre-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#f59e0b" stroke-width="2"/><path d="M12 6v1m0 10v1M9 9.5C9 8.12 10.34 7 12 7s3 1.12 3 2.5c0 1.74-2 2.5-3 3.5" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16" r="0.8" fill="#f59e0b"/></svg>
              </div>
              <div>
                <span class="sobre-card-title">Dinheiro<span style="color:var(--gold)">Nu</span></span>
                <span class="sobre-card-sub">Finanças sem enrolação</span>
              </div>
            </div>
            <div class="sobre-stat-list">
              <div class="sobre-stat-row">
                <span class="sobre-stat-row-num">50+</span>
                <div class="sobre-stat-row-info">
                  <strong>Artigos publicados</strong>
                  <span>Conteúdo novo toda semana</span>
                </div>
              </div>
              <div class="sobre-stat-row">
                <span class="sobre-stat-row-num">3</span>
                <div class="sobre-stat-row-info">
                  <strong>Ferramentas gratuitas</strong>
                  <span>Calculadoras financeiras prontas</span>
                </div>
              </div>
              <div class="sobre-stat-row">
                <span class="sobre-stat-row-num">100%</span>
                <div class="sobre-stat-row-info">
                  <strong>Gratuito e independente</strong>
                  <span>Sem produtos, sem viés comercial</span>
                </div>
              </div>
            </div>
            <div class="sobre-mission">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b"/></svg>
              <em>"Dinheiro não precisa ser mistério."</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
`;

let fullHtml = headMatch[0] + sobreHtml + footerMatch[0];
fs.writeFileSync('sobre.html', fullHtml);
console.log("Sobre.html generated");
