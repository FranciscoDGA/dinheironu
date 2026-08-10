const fs = require('fs');
const path = require('path');

const domain = 'https://dinheironu.vercel.app';
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const addUrl = (url, priority) => {
  sitemap += `  <url>\n    <loc>${domain}/${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <priority>${priority}</priority>\n  </url>\n`;
};

// Root files
const rootFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
rootFiles.forEach(f => {
  if (f === 'index.html') {
    addUrl('', '1.0');
  } else {
    addUrl(f, '0.8');
  }
});

// Artigos
const artigosDir = 'artigos';
if (fs.existsSync(artigosDir)) {
  const artigos = fs.readdirSync(artigosDir).filter(f => f.endsWith('.html'));
  artigos.forEach(f => {
    addUrl('artigos/' + f, '0.9');
  });
}

// Ferramentas
const ferramentasDir = 'ferramentas';
if (fs.existsSync(ferramentasDir)) {
  const ferramentas = fs.readdirSync(ferramentasDir).filter(f => f.endsWith('.html'));
  ferramentas.forEach(f => {
    addUrl('ferramentas/' + f, '0.9');
  });
}

sitemap += `</urlset>`;
fs.writeFileSync('sitemap.xml', sitemap);
console.log('sitemap.xml gerado com sucesso!');
