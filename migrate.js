const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'astro-project', 'src', 'pages');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const html = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const $ = cheerio.load(html);

  const title = $('title').text() || 'Fazendo Dinheiro';
  const description = $('meta[name="description"]').attr('content') || '';
  
  // To get the content between nav and footer, we can remove what we don't need
  // Or extract specific main elements
  
  // Astro layout includes ticker, nav, footer, scripts.
  // So we only want the content between the nav and the footer.
  let contentHtml = '';
  
  // Let's find the nodes between nav and footer
  const bodyChildren = $('body').contents();
  let inMain = false;
  
  bodyChildren.each((i, el) => {
    if (el.type === 'tag' && el.name === 'nav') {
      inMain = true;
      return;
    }
    if (el.type === 'tag' && el.name === 'footer') {
      inMain = false;
      return;
    }
    if (inMain) {
      if (el.type === 'tag' && el.name === 'script') return; // ignore scripts
      if (el.type === 'tag' && el.attribs && el.attribs.id === 'scrollTopBtn') return; // ignore top btn
      
      contentHtml += $.html(el);
    }
  });

  // Determine type
  let type = 'WebSite';
  if (file.includes('blog') || file.includes('artigos')) type = 'Article';
  
  const astroContent = `---
import Layout from '../layouts/Layout.astro';
---

<Layout title="${title}" description="${description}" type="${type}">
${contentHtml}
</Layout>
`;
  
  const name = file.replace('.html', '.astro');
  fs.writeFileSync(path.join(destDir, name), astroContent);
  console.log(`Migrated ${file} to ${name}`);
});
