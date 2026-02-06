import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function generateOG() {
  const width = 1200;
  const height = 630;
  
  // Create the gradient background with orbs effect using SVG
  const svgBackground = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cyan" cx="85%" cy="10%" r="40%">
          <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="purple" cx="20%" cy="90%" r="35%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="pink" cx="40%" cy="50%" r="25%">
          <stop offset="0%" stop-color="#ec4899" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#ec4899" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#22d3ee"/>
          <stop offset="50%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
      
      <!-- Dark background -->
      <rect width="100%" height="100%" fill="#0a0a0f"/>
      
      <!-- Gradient orbs -->
      <rect width="100%" height="100%" fill="url(#cyan)"/>
      <rect width="100%" height="100%" fill="url(#purple)"/>
      <rect width="100%" height="100%" fill="url(#pink)"/>
      
      <!-- Badge -->
      <rect x="80" y="180" width="165" height="40" rx="20" fill="rgba(34, 211, 238, 0.15)" stroke="rgba(34, 211, 238, 0.4)" stroke-width="1"/>
      <text x="162" y="207" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="600" fill="#22d3ee" text-anchor="middle" letter-spacing="2">AI-POWERED</text>
      
      <!-- Main title -->
      <text x="80" y="310" font-family="Inter, Arial, sans-serif" font-size="85" font-weight="800" fill="url(#textGrad)">Blog Squad</text>
      
      <!-- Tagline -->
      <text x="80" y="380" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500" fill="rgba(255,255,255,0.75)">Research-backed content that converts.</text>
      <text x="80" y="420" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500" fill="rgba(255,255,255,0.75)">Agency quality. AI speed.</text>
      
      <!-- Stella glow effect -->
      <defs>
        <radialGradient id="stellaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.5"/>
          <stop offset="70%" stop-color="#22d3ee" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="950" cy="315" rx="200" ry="200" fill="url(#stellaGlow)"/>
    </svg>
  `;
  
  // Load Stella image
  const stellaPath = join(publicDir, 'characters', 'stella.png');
  const stellaBuffer = readFileSync(stellaPath);
  
  // Resize Stella to be larger
  const stellaResized = await sharp(stellaBuffer)
    .resize(380, 392, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Create the final composite
  const result = await sharp(Buffer.from(svgBackground))
    .composite([
      {
        input: stellaResized,
        top: 120,
        left: 760,
      }
    ])
    .png()
    .toFile(join(publicDir, 'og-image.png'));
  
  console.log('✅ Generated og-image.png');
  
  // Also create a smaller version for Twitter
  await sharp(join(publicDir, 'og-image.png'))
    .resize(1200, 600, { fit: 'cover' })
    .toFile(join(publicDir, 'twitter-card.png'));
  
  console.log('✅ Generated twitter-card.png');
}

generateOG().catch(console.error);
