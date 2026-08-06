const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Na raiz
    if (filePath.indexOf('artigos') === -1) {
      content = content.replace(/href="index\.html#ferramentas"/g, 'href="ferramentas.html"');
      content = content.replace(/href="#ferramentas"/g, 'href="ferramentas.html"');
    } else {
      // Na pasta artigos
      content = content.replace(/href="\.\.\/index\.html#ferramentas"/g, 'href="../ferramentas.html"');
    }
    
    fs.writeFileSync(filePath, content);
  } catch(e) {}
}

const dir = fs.readdirSync('.');
dir.forEach(f => {
  if (f.endsWith('.html')) replaceInFile(f);
});

const artigosDir = fs.readdirSync('artigos');
artigosDir.forEach(f => {
  if (f.endsWith('.html')) replaceInFile(path.join('artigos', f));
});

console.log("Nav links fixed!");
