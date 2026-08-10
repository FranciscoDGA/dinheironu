const fs = require('fs');
const path = require('path');

const artigosDir = 'artigos';
const files = fs.readdirSync(artigosDir).filter(f => f.endsWith('.html'));

const index = [];

for (const f of files) {
  const filePath = path.join(artigosDir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract title
  const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : f;
  
  // Extract text (remove scripts, styles, html tags)
  let text = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                    .replace(/<!--[\s\S]*?-->/g, '')
                    .replace(/<[^>]+>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
  
  index.push({
    title: title,
    url: 'artigos/' + f,
    content: text
  });
}

fs.writeFileSync('search_index.json', JSON.stringify(index));
console.log('Search index generated with ' + index.length + ' articles.');
