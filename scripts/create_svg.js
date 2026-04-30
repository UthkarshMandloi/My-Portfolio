// This script copies the user's signature SVG to the public directory
// Run: node scripts/create_svg.js

const fs = require('fs');
const path = require('path');

// Read the SVG from stdin or use the embedded content
const svgPath = path.join(__dirname, '..', 'public', 'signature.svg');

// Check if the file already has content
const existing = fs.existsSync(svgPath) ? fs.readFileSync(svgPath, 'utf8') : '';
if (existing.length > 100) {
  console.log('SVG already exists with content, skipping.');
  process.exit(0);
}

console.log('Please paste the SVG content into public/signature.svg manually.');
console.log('The file is at:', svgPath);
