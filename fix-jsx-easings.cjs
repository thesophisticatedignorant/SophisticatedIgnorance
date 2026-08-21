const fs = require('fs');
const files = [
    'src/components/ProductDisplay.jsx',
    'src/components/HouseOfCrowns.jsx',
    'src/components/CartDrawer.jsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Revert the gsap ease property keys
    content = content.replace(/cubic-bezier\(\.22,\.61,\.36,1\):/g, 'ease:');
    // Also fix the comment in HouseOfCrowns.jsx that got mangled:
    // "Custom cubic-bezier(.22,.61,.36,1): resists at start..."
    content = content.replace(/Custom cubic-bezier\(\.22,\.61,\.36,1\):/g, 'Custom ease:');
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
});
