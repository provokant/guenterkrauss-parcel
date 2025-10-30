const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const OPT_DIR = path.join(ASSETS_DIR, 'optimized');
const BACKUP_DIR = path.join(ASSETS_DIR, 'optimized-backup');
const TOP_N = 20; // default top files to process
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 75;

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...walkDir(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function isImage(file) {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
}

if (!fs.existsSync(ASSETS_DIR)) {
  console.error('Assets dir not found:', ASSETS_DIR);
  process.exit(1);
}

if (!fs.existsSync(OPT_DIR)) fs.mkdirSync(OPT_DIR, { recursive: true });
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

const allFiles = walkDir(ASSETS_DIR).filter(isImage).filter(f => !f.includes(path.join('src','assets','optimized')) && !f.includes(path.join('src','assets','optimized-backup')));

const filesWithSize = allFiles.map(f => ({ file: f, size: fs.statSync(f).size })).sort((a,b) => b.size - a.size);

const toProcess = filesWithSize.slice(0, TOP_N);

(async () => {
  console.log('Found', filesWithSize.length, 'image files, processing top', toProcess.length);
  for (const item of toProcess) {
    const src = item.file;
    const base = path.basename(src);
    const optDest = path.join(OPT_DIR, base);
    const backupDest = path.join(BACKUP_DIR, base);

    // backup original if not already backed up
    if (!fs.existsSync(backupDest)) {
      fs.copyFileSync(src, backupDest);
    }

    try {
      const image = sharp(src);
      const metadata = await image.metadata();

      // recompress as JPEG (if PNG, convert to JPEG as well) with quality
      const jpegOut = optDest.replace(/\.png$/i, '.jpg');
      await image
        .jpeg({ quality: JPEG_QUALITY })
        .toFile(jpegOut);

      // generate webp
      const webpOut = jpegOut.replace(/\.(jpe?g)$/i, '.webp');
      await sharp(jpegOut).webp({ quality: WEBP_QUALITY }).toFile(webpOut);

      console.log('Processed', base, '->', path.basename(jpegOut), path.basename(webpOut), `(${(item.size/1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error('Failed processing', src, err.message);
    }
  }
  console.log('Done');
})();
