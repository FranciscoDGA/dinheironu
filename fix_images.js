const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, 'astro-project');
const imagesDir = path.join(projectDir, 'public', 'images');
const pagesDir = path.join(projectDir, 'src', 'pages');

const availableImages = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
const genericImages = availableImages.filter(f => f.startsWith('generic_'));

function getReplacementImage() {
  return genericImages[Math.floor(Math.random() * genericImages.length)];
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Regex to find src="images/..." or src="../images/..."
  content = content.replace(/src="(?:\.\.\/)*images\/([^"]+)"/g, (match, imageName) => {
    changed = true;
    let newImageName = imageName;
    
    // Check if the image exists
    if (!fs.existsSync(path.join(imagesDir, imageName))) {
      console.log(`Image not found: ${imageName} in ${filePath}`);
      newImageName = getReplacementImage();
      console.log(`Replaced with: ${newImageName}`);
    }
    
    // Return absolute path
    return `src="/images/${newImageName}"`;
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.astro')) {
      processFile(fullPath);
    }
  }
}

processDir(pagesDir);
console.log('Done fixing images!');
