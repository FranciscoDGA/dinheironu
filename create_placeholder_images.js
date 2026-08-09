#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const articles = [
  { name: 'cobranca-indevida', color: '#ef4444', icon: '⚠️', title: 'Cobrança Indevida' },
  { name: 'consignado-vs-cartao', color: '#f59e0b', icon: '💳', title: 'Consignado vs Cartão' },
  { name: 'corretoras', color: '#2563eb', icon: '📊', title: 'Corretoras' },
  { name: 'desenrola', color: '#10b981', icon: '🆓', title: 'Desenrola' },
  { name: 'educacao-infantil', color: '#8b5cf6', icon: '👶', title: 'Educação Infantil' },
  { name: 'esg', color: '#06b6d4', icon: '🌱', title: 'ESG' },
  { name: 'fgts-investimento', color: '#ec4899', icon: '💼', title: 'FGTS' },
  { name: 'fire', color: '#14b8a6', icon: '🔥', title: 'FIRE' },
  { name: 'fundos', color: '#f97316', icon: '📈', title: 'Fundos' },
  { name: 'ia-financas', color: '#6366f1', icon: '🤖', title: 'IA Finanças' },
  { name: 'inflacao', color: '#dc2626', icon: '📉', title: 'Inflação' },
  { name: 'juros-cartao', color: '#ca8a04', icon: '💸', title: 'Juros Cartão' },
  { name: 'juros-compostos', color: '#16a34a', icon: '📊', title: 'Juros Compostos' },
  { name: 'nome-sujo', color: '#7c3aed', icon: '⛔', title: 'Nome Sujo' },
  { name: 'orcamento-variavel', color: '#0891b2', icon: '📋', title: 'Orçamento' },
  { name: 'renda-passiva', color: '#be123c', icon: '💰', title: 'Renda Passiva' },
  { name: 'seguro-de-vida', color: '#059669', icon: '🛡️', title: 'Seguro' },
  { name: 'viver-de-renda', color: '#7c2d12', icon: '🏖️', title: 'Viver de Renda' }
];

const imagesDir = path.join(__dirname, 'images');

function generateSVG(data) {
  return `<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${data.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${data.color};stop-opacity:0.85" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:0.95" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="450" fill="url(#grad-${data.name})"/>

  <!-- Decorative blobs -->
  <circle cx="700" cy="100" r="100" fill="rgba(255,255,255,0.05)"/>
  <circle cx="100" cy="350" r="80" fill="rgba(255,255,255,0.03)"/>

  <!-- Accent line -->
  <rect x="0" y="0" width="800" height="4" fill="${data.color}" opacity="0.6"/>

  <!-- Icon container -->
  <circle cx="400" cy="140" r="70" fill="rgba(255,255,255,0.1)" filter="url(#shadow)"/>
  <text x="400" y="160" font-size="60" text-anchor="middle" dominant-baseline="middle">
    ${data.icon}
  </text>

  <!-- Title -->
  <text x="400" y="260" font-family="Playfair Display, serif" font-size="44" font-weight="700" fill="#ffffff" text-anchor="middle">
    ${data.title}
  </text>

  <!-- Subtitle -->
  <text x="400" y="310" font-family="Inter, sans-serif" font-size="16" fill="rgba(255,255,255,0.7)" text-anchor="middle">
    Aprenda sobre finanças pessoais
  </text>
</svg>`;
}

// Create images
articles.forEach(article => {
  const svg = generateSVG(article);
  const filePath = path.join(imagesDir, `${article.name}.jpg`);
  
  // Save as SVG with .jpg extension (browsers treat it fine)
  fs.writeFileSync(filePath, svg);
  console.log(`✓ Created: ${article.name}.jpg`);
});

console.log(`\n✅ Generated ${articles.length} placeholder images!`);
