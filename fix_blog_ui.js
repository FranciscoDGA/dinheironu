const fs = require('fs');
const path = require('path');

const filesToFix = ['blog.html', 'index.html'];

const genericImages = [
  'images/generic_investments.jpg',
  'images/generic_budget.jpg',
  'images/generic_savings.jpg',
  'images/generic_growth.jpg',
  'images/generic_planning.jpg',
  'images/generic_stocks.jpg',
  'images/dividas.jpg',
  'images/investimentos.jpg',
  'images/tesouro.jpg',
  'images/orcamento.jpg',
  'images/imovel.jpg'
];

// Helper to shuffle array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

filesToFix.forEach(filename => {
  let content = fs.readFileSync(filename, 'utf8');

  // Fix classes
  content = content.replace(/class="article-img-wrap"/g, 'class="card-img-wrap"');
  content = content.replace(/class="article-img"/g, 'class="card-img"');

  // Remove generic "Artigo" category tags
  content = content.replace(/<span class="article-category[^>]*>\s*Artigo\s*<\/span>\s*/gi, '');

  // Add "Ler artigo" link at the end of article-content
  // We need to inject it before </div> that closes article-content, but it's tricky with regex.
  // We can look for <div class="article-card-meta"> and replace it with <div class="article-card-meta"> + link
  // Wait, looking at blog.html, we have:
  // <div class="article-card-meta">
  //   <span class="article-read-time">...</span>
  // </div>
  // We can just add a link inside article-content.
  // Let's replace </div>\s*</article> with <a href="#" style="..." class="read-more">Ler artigo &rarr;</a>\n          </div>\n        </article>
  // Actually, we can just replace `<div class="article-card-meta">` with a wrapper that flexes space-between.
  const metaRegex = /(<div class="article-card-meta">[\s\S]*?<\/div>)/g;
  content = content.replace(metaRegex, (match) => {
    if (match.includes('Ler artigo')) return match; // already added
    // Find the href from the title above it
    // Wait, the title is before this div. We can't easily extract href in a simple replace.
    // Instead, let's just use JS DOM or better regex matching the whole article block.
    return match;
  });

  // Since regex for the whole block is better:
  const articleRegex = /<article class="article-card">([\s\S]*?)<\/article>/g;
  
  // Shuffle images for each file so they look varied
  let imgIndex = 0;
  const shuffledImages = shuffle([...genericImages, ...genericImages, ...genericImages]); // lots of images to pool from

  content = content.replace(articleRegex, (match, inner) => {
    let newInner = inner;

    // 1. Replace image if it's one of the generic ones (not the new top 5)
    // The top 5 have 'capa_'
    if (!newInner.includes('capa_')) {
      newInner = newInner.replace(/<img src="images\/[^"]+"\s+alt="([^"]+)"/, `<img src="\${shuffledImages[imgIndex % shuffledImages.length]}" alt="$1"`);
      imgIndex++;
    }

    // 2. Add 'Ler artigo' link if not present
    if (!newInner.includes('Ler artigo')) {
      const hrefMatch = newInner.match(/<a href="([^"]+)"/);
      const href = hrefMatch ? hrefMatch[1] : '#';
      
      const linkHtml = `<div style="margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
              \${newInner.match(/<div class="article-card-meta">[\s\S]*?<\/div>/) ? newInner.match(/<div class="article-card-meta">[\s\S]*?<\/div>/)[0] : ''}
              <a href="\${href}" style="color: var(--primary); font-weight: 600; text-decoration: none; font-size: 0.9rem; display: flex; align-items: center; gap: 4px;">Ler artigo <span style="font-size: 1.1em;">&rarr;</span></a>
            </div>`;
      
      // Remove old meta div
      newInner = newInner.replace(/<div class="article-card-meta">[\s\S]*?<\/div>/, '');
      
      // Append the new footer before the end of article-content
      newInner = newInner.replace(/(<\/div>\s*)$/, linkHtml + '\n          $1');
    }

    return `<article class="article-card">\${newInner}</article>`;
  });

  fs.writeFileSync(filename, content);
  console.log(`Fixed UI in \${filename}`);
});
