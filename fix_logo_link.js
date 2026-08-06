const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, isArticle) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const homeLink = isArticle ? '../index.html' : 'index.html';
  
  // Header logo
  content = content.replace(/<a href="#" class="nav-logo"/g, `<a href="${homeLink}" class="nav-logo"`);
  // Footer logo
  content = content.replace(/<a href="#" class="nav-logo footer-logo"/g, `<a href="${homeLink}" class="nav-logo footer-logo"`);
  
  fs.writeFileSync(filePath, content);
}

const dir = fs.readdirSync('.');
dir.forEach(f => {
  if (f.endsWith('.html')) replaceInFile(f, false);
});

const artigosDir = fs.readdirSync('artigos');
artigosDir.forEach(f => {
  if (f.endsWith('.html')) replaceInFile(path.join('artigos', f), true);
});

console.log("Logo links fixed!");
