const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#21A28E',
          darker: '#187a6b'
        },
        gray: {
          light: '#8E97A2',
          dark: '#2D3748',
        },
        teal: {
          400: '#21A28E',
        },
      },
      backgroundImage: {
        'mouse-right-click': "url('./assets/images/mouse-right-click.svg')",
        'mouse-left-click': "url('./assets/images/mouse-left-click.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
