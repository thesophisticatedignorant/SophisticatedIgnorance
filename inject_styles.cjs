const fs = require('fs');
const files = [
  'public/contradiction_exterior_interactive_360_viewer_refined.html',
  'public/contradiction_reversed_interactive_360_viewer.html'
];

const injectStyle = `
<style id="custom-injected-styles">
  body { background: transparent !important; padding: 0 !important; margin: 0 !important; overflow: hidden !important; display: block !important; }
  .viewer-header, .viewer-footer { display: none !important; }
  .viewer-shell { border: none !important; box-shadow: none !important; background: transparent !important; backdrop-filter: none !important; margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; height: 100vh !important; display: flex !important; flex-direction: column !important; justify-content: center !important; }
  #viewer, #viewer-container { width: 100% !important; height: 100% !important; flex: 1 !important; position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
  canvas, #viewer img { width: 100% !important; height: 100% !important; max-height: 100vh !important; object-fit: contain !important; position: absolute !important; top: 0 !important; left: 0 !important; }
</style>
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // First, remove the old injected style block if it exists
  content = content.replace(/<style>[\s\S]*?body { background: transparent !important;[\s\S]*?<\/style>\s*<\/head>/g, '</head>');
  // Also remove if it has id="custom-injected-styles"
  content = content.replace(/<style id="custom-injected-styles">[\s\S]*?<\/style>\s*/g, '');
  
  // Now inject the new styles
  content = content.replace('</head>', injectStyle + '\n</head>');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Injected new styles into ' + file);
});
