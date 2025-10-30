const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{html,js,ts,css,scss}',
    './src/styles/**/*.css',
    './src/partials/**/*.{html,js,ts}',
    './index.html'
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '2rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontSize: {
      ...defaultTheme.fontSize,
      base: '1rem',
      lg: '1.125rem',
      xl: '1.5rem',
      '2xl': '3rem',
      '3xl': '5rem'
    },
    colors: {
      black: '#2D2D2A',
      gray: colors.gray,
      // keep full red palette but set project's default red
      red: {
        ...colors.red,
        DEFAULT: '#e30018'
      },
      white: colors.white,
      transparent: 'transparent'
    },
    opacity: {
      ...defaultTheme.opacity,
      90: '.9'
    }
  },
  variants: {
    textColor: ['hover'],
  },
  plugins: []
  ,
  safelist: [
    'mb-4', 'text-xl', 'text-lg', 'text-2xl', 'opacity-100', 'opacity-75', 'opacity-50',
    'flex', 'flex-col', 'flex-row', 'mx-auto', 'w-full', 'w-1/3', 'w-2/3', 'w-32', 'w-56',
    'pt-20', 'pb-20', 'py-20', 'pl-20', 'mt-8', 'mt-0', 'ml-5', 'mr-5', 'no-underline', 'underline',
    'block', 'inline', 'hidden', 'relative', 'absolute', 'inset-0', 'inset-y-0'
  ]
}
