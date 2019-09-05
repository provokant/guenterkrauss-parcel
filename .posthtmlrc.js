module.exports = {
  plugins: {
    'posthtml-img-autosize': {
      root: __dirname + '/src/assets'
    },
    'posthtml-include': {
      root: __dirname + '/src/partials',
    }
  }
}