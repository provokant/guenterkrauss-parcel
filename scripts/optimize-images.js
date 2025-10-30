#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.resolve(__dirname, '../src/assets');
const OUT_DIR = path.join(ASSETS_DIR, 'optimized');
const MIN_BYTES = 1024 * 1024; // 1 MB
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 80;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function isImage(file) {
  const exts = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif'];
  return exts.includes(path.extname(file).toLowerCase());
}

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

async function optimizeFile(file) {
  const rel = path.relative(ASSETS_DIR, file);
  const outDir = path.join(OUT_DIR, path.dirname(rel));
  ensureDir(outDir);

  const base = path.basename(file, path.extname(file));
  const outWebp = path.join(outDir, base + '.webp');
  const outJpeg = path.join(outDir, base + '.jpg');

  const stat = fs.statSync(file);
  const originalSize = stat.size;

  try {
    // produce webp
    await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outWebp);

    // produce jpeg (for png/jpg inputs)
    await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(outJpeg);

    const webpStat = fs.statSync(outWebp);
    const jpegStat = fs.statSync(outJpeg);

    console.log(`${rel} -> ${(originalSize/1024).toFixed(1)}KB | webp ${(webpStat.size/1024).toFixed(1)}KB, jpg ${(jpegStat.size/1024).toFixed(1)}KB`);
  } catch (err) {
    console.error('FAILED', rel, err.message);
  }
}

(async function main() {
  console.log('Scanning', ASSETS_DIR, 'for files > 1MB...');
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error('Assets dir not found:', ASSETS_DIR);
    process.exit(2);
  }

  ensureDir(OUT_DIR);

  const files = walkDir(ASSETS_DIR).filter((f) => isImage(f));
  const big = files.filter((f) => fs.statSync(f).size > MIN_BYTES);

  if (big.length === 0) {
    console.log('No files > 1MB found.');
    process.exit(0);
  }

  console.log('Found', big.length, 'large files. Optimizing...');
  for (const f of big) {
    // skip files in the optimized output folder (avoid infinite loop)
    if (f.startsWith(OUT_DIR)) continue;
    await optimizeFile(f);
  }

  console.log('Done. Optimized images are in', OUT_DIR);
})();
