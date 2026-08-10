const fs = require('fs');

const cardsHtml = `
        <article class="article-card">
          <div class="article-img-wrap">
            <span class="article-category article-cat--gold">Renegociação</span>
            <img src="images/capa_desenrola.jpg" alt="Novo Desenrola" class="article-img" loading="lazy">
          </div>
          <div class="article-content">
            <h3 class="article-card-title"><a href="artigos/novo-desenrola-2026.html">Como negociar dívidas com o Novo Desenrola Brasil 2026</a></h3>
            <p class="article-card-excerpt">Saiba como o Novo Desenrola Brasil (MP 1.355/2026) pode ajudar você a quitar dívidas com até 90% de desconto.</p>
          </div>
        </article>

        <article class="article-card">
          <div class="article-img-wrap">
            <span class="article-category article-cat--red">Cartão</span>
            <img src="images/capa_cartao.jpg" alt="Juros do Cartão" class="article-img" loading="lazy">
          </div>
          <div class="article-content">
            <h3 class="article-card-title"><a href="artigos/juros-cartao-2026.html">Cartão de crédito em 2026: Como evitar os 400% de juros</a></h3>
            <p class="article-card-excerpt">Os juros continuam altos. Entenda a nova lei e alternativas mais baratas de crédito.</p>
          </div>
        </article>

        <article class="article-card">
          <div class="article-img-wrap">
            <span class="article-category article-cat--blue">Economia</span>
            <img src="images/capa_inflacao.jpg" alt="Inflação" class="article-img" loading="lazy">
          </div>
          <div class="article-content">
            <h3 class="article-card-title"><a href="artigos/inflacao-2026.html">Inflação em alta: 7 estratégias para proteger seu dinheiro</a></h3>
            <p class="article-card-excerpt">Descubra os ativos que blindam o seu patrimônio do aumento do custo de vida em 2026.</p>
          </div>
        </article>

        <article class="article-card">
          <div class="article-img-wrap">
            <span class="article-category article-cat--gold">Direitos</span>
            <img src="images/capa_cobrancas.jpg" alt="Cobranças" class="article-img" loading="lazy">
          </div>
          <div class="article-content">
            <h3 class="article-card-title"><a href="artigos/cobrancas-indevidas.html">Cobranças indevidas no banco? Saiba como reclamar</a></h3>
            <p class="article-card-excerpt">Aprenda a identificar tarifas ocultas e como acionar seus direitos e ter o dinheiro de volta.</p>
          </div>
        </article>

        <article class="article-card">
          <div class="article-img-wrap">
            <span class="article-category article-cat--green">ESG</span>
            <img src="images/capa_esg.jpg" alt="Investimentos ESG" class="article-img" loading="lazy">
          </div>
          <div class="article-content">
            <h3 class="article-card-title"><a href="artigos/investimentos-esg.html">Investimentos ESG: Como ganhar dinheiro alinhado aos seus valores</a></h3>
            <p class="article-card-excerpt">Lucro e sustentabilidade andam juntos. Entenda por que grandes investidores estão migrando para ESG.</p>
          </div>
        </article>
`;

function injectCards(filename, regexMarker) {
  let content = fs.readFileSync(filename, 'utf8');
  if (!content.includes('novo-desenrola-2026.html')) {
    content = content.replace(regexMarker, '$1\n' + cardsHtml);
    fs.writeFileSync(filename, content);
    console.log('Cards injected into', filename);
  }
}

injectCards('blog.html', /(<div class="articles-grid"[^>]*>)/);
injectCards('index.html', /(<div class="articles-grid"[^>]*>)/);
