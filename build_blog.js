const fs = require('fs');
const path = require('path');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract head, nav, footer
const headMatch = indexHtml.match(/([\s\S]*?)<section class="hero"/i);
const footerMatch = indexHtml.match(/(<!-- ═══════════════════════ FOOTER ═══════════════════════ -->[\s\S]*)/i);

let head = headMatch[1];
let footer = footerMatch[1];

// Update title in head
head = head.replace(/<title>.*?<\/title>/, '<title>Blog - Fazendo Dinheiro</title>');
head = head.replace(/href="index\.html#recentes"/g, 'href="blog.html"');

// Modify navbar links so they work from blog.html
head = head.replace(/href="#ferramentas"/g, 'href="index.html#ferramentas"');

const artigosDir = 'artigos';
const files = fs.readdirSync(artigosDir).filter(f => f.endsWith('.html'));

let articlesHtml = '';

files.forEach(file => {
  const content = fs.readFileSync(path.join(artigosDir, file), 'utf8');
  
  // Extract title
  let title = 'Artigo';
  const titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (titleMatch) title = titleMatch[1].trim();

  // Extract description
  let desc = '';
  const descMatch = content.match(/<meta name="description" content="([^"]+)"/i);
  if (descMatch) desc = descMatch[1].trim();

  // Determine an image fallback based on filename keywords
  let img = 'investimentos.jpg';
  const name = file.toLowerCase();
  if (name.includes('cartao') || name.includes('divida') || name.includes('nome-sujo')) img = 'dividas.jpg';
  else if (name.includes('orcamento') || name.includes('reserva') || name.includes('habito')) img = 'orcamento.jpg';
  else if (name.includes('tesouro') || name.includes('poupanca') || name.includes('fgts')) img = 'tesouro.jpg';
  else if (name.includes('imovel')) img = 'imovel.jpg';

  articlesHtml += `
        <article class="article-card">
          <div class="article-img-wrap">
            <span class="article-category article-cat--blue">Artigo</span>
            <img src="images/${img}" alt="${title}" class="article-img" loading="lazy">
          </div>
          <div class="article-content">
            <h3 class="article-card-title"><a href="artigos/${file}">${title}</a></h3>
            <p class="article-card-excerpt">${desc}</p>
            <div class="article-card-meta">
              <span class="article-read-time">5 min de leitura</span>
            </div>
          </div>
        </article>
  `;
});

const blogHtml = `${head}
  <main>
    <section class="page-hero" style="background: linear-gradient(135deg, var(--blue), var(--primary)); padding: 120px 20px 60px; text-align: center; color: white;">
      <div class="container">
        <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 16px;">Blog Fazendo Dinheiro</h1>
        <p style="font-size: 1.1rem; max-width: 700px; margin: 0 auto; opacity: 0.9;">Todos os nossos artigos e guias para transformar sua vida financeira.</p>
      </div>
    </section>

    <section class="section" style="padding-top: 60px;">
      <div class="container">
        <div class="articles-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px;">
${articlesHtml}
        </div>
      </div>
    </section>
  </main>
${footer}
`;

fs.writeFileSync('blog.html', blogHtml);
console.log('blog.html created successfully.');

// Also update "Blog" links in index.html, ferramentas.html, contato.html, sobre.html etc.
const roots = ['index.html', 'ferramentas.html', 'contato.html', 'sobre.html', 'glossario.html', 'guia.html', 'termos.html', 'privacidade.html'];
roots.forEach(r => {
  if(fs.existsSync(r)) {
    let html = fs.readFileSync(r, 'utf8');
    html = html.replace(/href="index\.html#recentes"/g, 'href="blog.html"');
    html = html.replace(/href="#recentes"/g, 'href="blog.html"');
    fs.writeFileSync(r, html);
  }
});

// Update in articles
files.forEach(file => {
  let p = path.join(artigosDir, file);
  let html = fs.readFileSync(p, 'utf8');
  html = html.replace(/href="\.\.\/index\.html#recentes"/g, 'href="../blog.html"');
  fs.writeFileSync(p, html);
});
