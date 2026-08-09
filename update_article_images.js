#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const articlesMapping = {
  'cobranca-indevida.html': 'cobranca-indevida',
  'consignado-vs-cartao.html': 'consignado-vs-cartao',
  'corretoras.html': 'corretoras',
  'desenrola.html': 'desenrola',
  'educacao-infantil.html': 'educacao-infantil',
  'esg.html': 'esg',
  'fgts-investimento.html': 'fgts-investimento',
  'fire.html': 'fire',
  'fundos.html': 'fundos',
  'ia-financas.html': 'ia-financas',
  'inflacao.html': 'inflacao',
  'juros-cartao.html': 'juros-cartao',
  'juros-compostos.html': 'juros-compostos',
  'nome-sujo.html': 'nome-sujo',
  'orcamento-variavel.html': 'orcamento-variavel',
  'renda-passiva.html': 'renda-passiva',
  'seguro-de-vida.html': 'seguro-de-vida',
  'viver-de-renda.html': 'viver-de-renda',
};

const articlesDir = path.join(__dirname, 'artigos');

Object.entries(articlesMapping).forEach(([filename, imageName]) => {
  const filePath = path.join(articlesDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace any article-featured-img image with the correct one
  content = content.replace(
    /<img src="\.\.\/images\/.*?\.jpg" alt="[^"]*" class="article-featured-img" \/>/,
    `<img src="../images/${imageName}.jpg" alt="Artigo sobre ${imageName.replace(/-/g, ' ')}" class="article-featured-img" />`
  );

  fs.writeFileSync(filePath, content);
  console.log(`✓ Updated: ${filename}`);
});

console.log('\n✅ All article images updated!');
