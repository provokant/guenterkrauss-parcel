const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const package = require('./package.json')

const { srcSetAssets } = package
const { breakpoints, assetsPath, allowedExtensions } = srcSetAssets

const OPTIMIZED_DIR = path.join(assetsPath, 'optimized')
const FORCE_OVERWRITE = process.env.PREBUILD_OVERWRITE === '1'

const list = fs.readdirSync(assetsPath)
  .filter(
    file => fs.lstatSync(path.join(assetsPath, file)).isFile()
  )
  .filter(file => allowedExtensions.includes(path.extname(file)))
  .filter(file => file.indexOf('@') === -1)
  .map(image => {
    // Prefer optimized original if available
    const optimizedOriginal = path.join(OPTIMIZED_DIR, image)
    const originalPath = fs.existsSync(optimizedOriginal) ? optimizedOriginal : path.join(assetsPath, image)
    const imageName = image.replace(/\.[^/.]+$/, '')
    const ext = path.extname(image)

    Object.keys(breakpoints).forEach(key => {
      const newPath = path.join(assetsPath, `${imageName}@${key}${ext}`)
      const { width } = breakpoints[key]

      if (fs.existsSync(newPath) && !FORCE_OVERWRITE) {
        console.error(`WARN: '${newPath}' already exists and will not be overwritten`)
        return
      }

      sharp(originalPath)
        .resize(width)
        .rotate() // Auto-rotate based on EXIF orientation
        .toFile(newPath)
        .then(() => {
          console.log(`Transformed '${originalPath}' to '${newPath}'`)
        })
        .catch(error => {
          console.error(`ERROR: Failed to transform '${originalPath}' to '${newPath}':`, error.message)
        })

    })
  })