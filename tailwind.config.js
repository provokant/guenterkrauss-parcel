const { colors, fontFamily, opacity, fontSize } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/*.{html,js,ts,css,scss}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '2rem',
    },
    fontSize: {
      ...fontSize,
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.5rem',
      '2xl': '3rem',
      '3xl': '5rem'
    },
    colors: {
      black: '#2D2D2A',
      gray: colors.gray,
      red: '#e30018',
      white: colors.white,
      transparent: colors.transparent
    },
    opacity: {
      ...opacity,
      90: '.9'
    }
  },
  variants: {
    textColor: ['hover'],
  },
  plugins: []
}
