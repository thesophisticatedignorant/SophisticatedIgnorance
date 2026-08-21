const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.css') || file.endsWith('.scss') || file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
};

const files = walk(path.join(__dirname, 'src'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace all ease variants and other cubic-beziers with our target bezier
    // But don't double replace our target bezier
    content = content.replace(/ ease([-\w]*)/g, ' cubic-bezier(.22,.61,.36,1)');
    content = content.replace(/cubic-bezier\([^)]+\)/g, 'cubic-bezier(.22,.61,.36,1)');
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated easings in ${file}`);
    }
});
