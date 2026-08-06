const fs = require('fs');
const path = require('path');

const artigosDir = 'artigos';
const files = fs.readdirSync(artigosDir);

for (const f of files) {
  if (f.endsWith('.html')) {
    const filePath = path.join(artigosDir, f);
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has breadcrumbs
    if (content.includes('class="breadcrumbs"')) {
      continue;
    }

    // Extract title
    const titleMatch = content.match(/<h1 class="article-title">(.*?)<\/h1>/);
    let shortTitle = "Artigo";
    if (titleMatch && titleMatch[1]) {
      shortTitle = titleMatch[1].trim();
    }

    const breadcrumbHtml = `
      <nav class="breadcrumbs" aria-label="Breadcrumb" style="margin-bottom: 24px;">
        <ol style="list-style: none; padding: 0; margin: 0; display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: rgba(255,255,255,0.6);">
          <li><a href="../index.html" style="color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Início</a></li>
          <li><span style="opacity: 0.4;">/</span></li>
          <li><a href="../index.html#recentes" style="color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Artigos</a></li>
          <li><span style="opacity: 0.4;">/</span></li>
          <li aria-current="page" style="color: #fff; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 250px;" title="${shortTitle}">${shortTitle}</li>
        </ol>
      </nav>`;

    content = content.replace(
      /(<div class="article-hero-inner">\s*)(<span class="article-category)/i,
      `$1${breadcrumbHtml}\n      $2`
    );

    fs.writeFileSync(filePath, content);
  }
}

console.log("Breadcrumbs added to all articles!");
