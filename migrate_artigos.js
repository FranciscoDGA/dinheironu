const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const srcDir = path.join(__dirname, 'artigos');
const destDir = path.join(__dirname, 'astro-project', 'src', 'pages', 'artigos');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const html = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const $ = cheerio.load(html);

  const title = $('title').text() || 'Artigo | Fazendo Dinheiro';
  const description = $('meta[name="description"]').attr('content') || '';
  
  let contentHtml = '';
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

  // Step 5: Internal Linking - Inject ToolPromo
  // We'll replace instances of "juros compostos" with the component (or just inject it after a certain paragraph)
  // But wait, Astro components need to be imported.
  let toolPromoImport = "import ToolPromo from '../../components/ToolPromo.astro';";
  
  let pCount = 0;
  contentHtml = contentHtml.replace(/<\/p>/gi, (match) => {
     pCount++;
     if (pCount === 2) {
         return match + '\n\n<ToolPromo type="juros" />\n\n';
     }
     return match;
  });

  const astroContent = `---
import Layout from '../../layouts/Layout.astro';
${toolPromoImport}
---

<Layout title="${title}" description="${description}" type="Article">
${contentHtml}
</Layout>
`;
  
  const name = file.replace('.html', '.astro');
  fs.writeFileSync(path.join(destDir, name), astroContent);
  console.log(`Migrated ${file} to ${name}`);
});
