const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  ['poupanca', 'poupanca'],
  ['invest', 'investimentos'],
  ['cartao', 'cartao'],
  ['tesouro', 'tesouro']
];

const recent = [
  ['dividas', 'dividas'],
  ['imovel', 'imovel'],
  ['orcamento', 'orcamento'],
  ['fgts', 'fgts'],
  ['reserva', 'reserva'],
  ['habitos', 'habitos']
];

replacements.forEach(([idName, link]) => {
  let regex = new RegExp(`href="#" (id="article-link-${idName}")`, 'g');
  html = html.replace(regex, `href="artigos/${link}.html" $1`);
});
recent.forEach(([idName, link]) => {
  let regex = new RegExp(`href="#" (id="recent-link-${idName}")`, 'g');
  html = html.replace(regex, `href="artigos/${link}.html" $1`);
});

html = html.replace(/<h3 class="card-title"><a href="(artigos\/[^"]+)"[^>]*>[\s\S]*?<\/h3>\s*(?:<p class="card-excerpt">[\s\S]*?<\/p>\s*)?<a href="#" class="card-cta">/g, (match, url) => {
  return match.replace(/<a href="#" class="card-cta">$/, `<a href="${url}" class="card-cta">`);
});

fs.writeFileSync('index.html', html);
console.log("OK");
