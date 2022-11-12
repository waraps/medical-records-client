/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-pruple': {
          100: '#999AD2',
          200: '#847DC1',
          300: '#837CBA',
          400: '#514D67',
          500: '#48455c',
          600: '#403d52',
          700: '#383548',
          800: '#302e3d',
          900: '#282633',
        },
        "primary-green": {
          100: '#e5ffe6',
          200: '#c4e1c5',
          300: '#a4c3a4',
          400: '#84a685',
          500: '#678968',
          600: "#759876",
          700: '617d62',
          800: '4d634e',
          900: '3b4a3b',
        },
      },
      transitionDelay: {
        '0': '0ms',
      },
      transitionDuration: {
        '0': '0ms',
      }
    },
  },
  plugins: [],
}