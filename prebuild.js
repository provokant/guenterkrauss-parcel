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
      const { width, angle } = breakpoints[key]

      if (fs.existsSync(newPath)) {
        console.error(`WARN: '${newPath}' already exists and will not be overwritten`)
        return
      }

      console.log(width, angle)

      sharp(originalPath)
        .resize(width)
        .toFile(newPath)
        .then(data => {
          console.log(`Transformed '${originalPath}' to '${newPath}'`)
        })
        .catch(error => {
          console.error(`ERROR: Failed to transform '${originalPath}' to '${newPath}'`)
        })

    })
  })