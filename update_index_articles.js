const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The #recentes section currently has a grid of articles. 
// We will replace the entire grid inner HTML with the new articles.
const gridRegex = /(<section id="recentes" class="section">[\s\S]*?<div class="articles-grid">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/i;

const newGrid = `
          <!-- Novo Desenrola -->
          <article class="article-card">
            <div class="article-img-wrap">
              <span class="article-category article-cat--red">Dívidas</span>
              <img src="images/dividas.jpg" alt="Negociar dívidas" class="article-img" loading="lazy">
            </div>
            <div class="article-content">
              <h3 class="article-card-title"><a href="artigos/desenrola.html">Como negociar dívidas com o Novo Desenrola Brasil 2026</a></h3>
              <p class="article-card-excerpt">Guia prático para quitar suas contas com os juros baixos da MP 1.355/2026 e sair do sufoco financeiro definitivamente.</p>
              <div class="article-card-meta">
                <span class="article-date">05 Ago 2026</span>
                <span class="article-read-time">10 min de leitura</span>
              </div>
            </div>
          </article>

          <!-- Juros Cartão -->
          <article class="article-card">
            <div class="article-img-wrap">
              <span class="article-category article-cat--red">Dívidas</span>
              <img src="images/cartao.jpg" alt="Juros cartão" class="article-img" loading="lazy">
            </div>
            <div class="article-content">
              <h3 class="article-card-title"><a href="artigos/juros-cartao.html">Cartão de crédito em 2026: Como evitar os 400% de juros</a></h3>
              <p class="article-card-excerpt">Tudo sobre as novas regras da Lei 14.836 e as alternativas mais baratas ao rotativo do cartão.</p>
              <div class="article-card-meta">
                <span class="article-date">02 Ago 2026</span>
                <span class="article-read-time">8 min de leitura</span>
              </div>
            </div>
          </article>

          <!-- Inflação -->
          <article class="article-card">
            <div class="article-img-wrap">
              <span class="article-category article-cat--gold">Economia</span>
              <img src="images/tesouro.jpg" alt="Inflação" class="article-img" loading="lazy">
            </div>
            <div class="article-content">
              <h3 class="article-card-title"><a href="artigos/inflacao.html">Inflação em alta: 7 estratégias para proteger seu dinheiro</a></h3>
              <p class="article-card-excerpt">O custo de vida disparou. Veja como alocar seus investimentos e blindar o seu patrimônio da perda de valor.</p>
              <div class="article-card-meta">
                <span class="article-date">28 Jul 2026</span>
                <span class="article-read-time">7 min de leitura</span>
              </div>
            </div>
          </article>

          <!-- ESG -->
          <article class="article-card">
            <div class="article-img-wrap">
              <span class="article-category article-cat--green">Investimentos</span>
              <img src="images/investimentos.jpg" alt="Investimentos ESG" class="article-img" loading="lazy">
            </div>
            <div class="article-content">
              <h3 class="article-card-title"><a href="artigos/esg.html">Investimentos sustentáveis: Ganhe dinheiro alinhado aos seus valores</a></h3>
              <p class="article-card-excerpt">O que é ESG e como lucrar investindo em empresas e fundos com responsabilidade social e ambiental.</p>
              <div class="article-card-meta">
                <span class="article-date">20 Jul 2026</span>
                <span class="article-read-time">9 min de leitura</span>
              </div>
            </div>
          </article>

          <!-- Consignado vs Cartão -->
          <article class="article-card">
            <div class="article-img-wrap">
              <span class="article-category article-cat--red">Dívidas</span>
              <img src="images/dividas.jpg" alt="Consignado" class="article-img" loading="lazy">
            </div>
            <div class="article-content">
              <h3 class="article-card-title"><a href="artigos/consignado-vs-cartao.html">Empréstimo consignado vs. cartão: Qual a pior dívida?</a></h3>
              <p class="article-card-excerpt">Uma análise fria e matemática de qual dívida você deve priorizar pagar hoje mesmo.</p>
              <div class="article-card-meta">
                <span class="article-date">15 Jul 2026</span>
                <span class="article-read-time">6 min de leitura</span>
              </div>
            </div>
          </article>

          <!-- IA para financas -->
          <article class="article-card">
            <div class="article-img-wrap">
              <span class="article-category article-cat--blue">Ferramentas</span>
              <img src="images/habitos.jpg" alt="IA Finanças" class="article-img" loading="lazy">
            </div>
            <div class="article-content">
              <h3 class="article-card-title"><a href="artigos/ia-financas.html">IA para finanças: 5 ferramentas que gerenciam seu dinheiro</a></h3>
              <p class="article-card-excerpt">Como a inteligência artificial pode automatizar seu orçamento e encontrar economias invisíveis no seu extrato.</p>
              <div class="article-card-meta">
                <span class="article-date">10 Jul 2026</span>
                <span class="article-read-time">5 min de leitura</span>
              </div>
            </div>
          </article>
`;

let newHtml = html.replace(gridRegex, `$1\n${newGrid}\n$3`);
fs.writeFileSync('index.html', newHtml);
console.log("index.html updated with new articles");
