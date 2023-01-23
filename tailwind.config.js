/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
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

        gray: {
          900: '#121214',
          800: '#202024',
        }
      },
      borderWidth: {
        1: '1px'
      },
      fontFamily: {
        sans: 'Inter, sans-serif'
      },
      keyframes: {
        'overlayShow': {
          'from': {  opacity: '0' },
          'to': {  opacity: '1'},
        }
      },
      animation: {
        'dialog-open': 'overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1);',
        'dialog-open-left': 'overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1);',
        'dropdown-menu-open': 'overlayShow 300ms cubic-bezier(0.16, 1, 0.3, 1);',
      }
    }
  },
  plugins: [],
}
