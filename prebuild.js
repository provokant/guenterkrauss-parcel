const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const package = require('./package.json')

const { srcSetAssets } = package
const { breakpoints, assetsPath, allowedExtensions } = srcSetAssets

const list = fs.readdirSync(assetsPath)
  .filter(
    file => fs.lstatSync(path.join(assetsPath, file)).isFile()
  )
  .filter(file => allowedExtensions.includes(path.extname(file)))
  .filter(file => file.indexOf('@') === -1)
  .map(image => {
    const originalPath = path.join(assetsPath, image)
    const imageName = image.replace(/\.[^/.]+$/, '')
    const ext = path.extname(image)
    
    Object.keys(breakpoints).forEach(key => {
      const newPath = path.join(assetsPath, `${imageName}@${key}${ext}`)

      if (fs.existsSync(newPath)) {
        console.error(`WARN: '${newPath}' already exists and will not be overwritten`)
        return
      }

      sharp(originalPath)
        .resize({ width: Number.parseInt(breakpoints[key]) })
        .toFile(newPath)
        .then(data => {
          console.log(`Transformed '${originalPath}' to '${newPath}'`)
        })
        .catch(error => {
          console.error(`ERROR: Failed to transform '${originalPath}' to '${newPath}'`)
        })

    })
  })