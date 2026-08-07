const fs = require('fs');
const path = require('path');

const htmlPath = 'public/contradiction_exterior_interactive_360_viewer_refined.html';
const outDir = 'public/contradiction_exterior_360';
let html = fs.readFileSync(htmlPath, 'utf8');

if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir);
}

let match;
let counter = 0;
// We look for src="data:image/png;base64,..."
// The regex finds data URIs and replaces them.
const regex = /src="data:image\/([^;]+);base64,([^"]+)"/g;

html = html.replace(regex, (fullMatch, ext, base64Data) => {
    const filename = `frame_${String(counter).padStart(2, '0')}.png`;
    const filepath = path.join(outDir, filename);
    fs.writeFileSync(filepath, base64Data, 'base64');
    console.log(`Saved ${filename}`);
    counter++;
    return `src="contradiction_exterior_360/${filename}"`;
});

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Done! Extracted ' + counter + ' images.');
