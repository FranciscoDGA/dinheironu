const fs = require('fs');
const path = require('path');

const artigosDir = 'artigos';
const files = fs.readdirSync(artigosDir).filter(f => f.endsWith('.html'));

const top10 = files.slice(0, 10);

top10.forEach(f => {
  const filePath = path.join(artigosDir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
  const baseTitle = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : "Artigo Financeiro";

  const newTitle = baseTitle + " | Guia Completo [2026] - Fazendo Dinheiro";
  const newDesc = "Descubra tudo sobre " + baseTitle + ". Aprenda como organizar suas finanças, investir melhor e conquistar sua liberdade financeira de forma simples e direta.";

  content = content.replace(/<title>.*?<\/title>/i, "<title>" + newTitle + "</title>");
  
  if (content.includes('name="description"')) {
    content = content.replace(/<meta name="description" content=".*?"\s*\/?>/i, '<meta name="description" content="' + newDesc + '" />');
  } else {
    content = content.replace(/<title>/i, '<meta name="description" content="' + newDesc + '" />\n  <title>');
  }

  if (!content.includes('<h2')) {
    content = content.replace(/<h3/g, '<h2').replace(/<\/h3>/g, '</h2>');
  }

  fs.writeFileSync(filePath, content);
});

console.log("SEO On-Page otimizado em 10 artigos.");
