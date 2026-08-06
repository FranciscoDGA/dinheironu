const fs = require('fs');
const path = require('path');

const faviconSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="6" fill="#0f172a" />
  <path d="M16 8L8 16M16 8H9.5M16 8V14.5" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const logoSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="6" fill="#0f172a" />
  <path d="M16 8L8 16M16 8H9.5M16 8V14.5" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Save favicon
if (!fs.existsSync('images')) fs.mkdirSync('images');
fs.writeFileSync('images/favicon.svg', faviconSVG);

// Regex for the old logo
const oldSvgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/;

function processDir(dir, prefix) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.html')) {
      const filePath = path.join(dir, f);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace the inline logo inside .logo-icon-wrap
      // We look for .logo-icon-wrap and replace its inner SVG
      const logoWrapRegex = /(<div class="logo-icon-wrap"\s*>)([\s\S]*?)(<\/div>)/i;
      content = content.replace(logoWrapRegex, `$1\n          ${logoSVG}\n        $3`);
      
      // Add Favicon to head if not exists
      if (!content.includes('rel="icon"')) {
        const faviconLink = `\n  <link rel="icon" type="image/svg+xml" href="${prefix}images/favicon.svg" />`;
        content = content.replace(/<\/head>/i, `${faviconLink}\n</head>`);
      }
      
      fs.writeFileSync(filePath, content);
    }
  }
}

processDir('.', '');
processDir('artigos', '../');

console.log("Logo and Favicon applied to all pages!");
