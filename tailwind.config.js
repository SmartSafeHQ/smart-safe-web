const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1700px '
      },
      colors: {
        transparent: 'transparent',

        black: '#000',
        white: '#FFF',
      },
      borderWidth: {
        1: '1px'
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        'dialog-open': 'overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1);',
        'dialog-open-left': 'overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1);',
        'dropdown-menu-open': 'overlayShow 300ms cubic-bezier(0.16, 1, 0.3, 1);'
      }
    }
  },
  plugins: []
}
