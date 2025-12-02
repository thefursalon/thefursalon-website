/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f6f0',
          100: '#e8ead8',
          200: '#d1d5b8',
          300: '#b4ba8f',
          400: '#969d6b',
          500: '#78804d',
          600: '#596145',
          700: '#4a5038',
          800: '#3b402b',
          900: '#2c301f',
        },
        gold: {
          50: '#fffef5',
          100: '#fffce8',
          200: '#fff9d1',
          300: '#fff5b0',
          400: '#ffef85',
          500: '#ffe85a',
          600: '#d4c04a',
          700: '#a8963a',
          800: '#7d6c2a',
          900: '#52421a',
        },
      },
    },
  },
  plugins: [],
}

