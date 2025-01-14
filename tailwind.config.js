/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        dvh: '100dvh', // Add a custom height for dynamic viewport height
      },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }
        xsm: '830px',
        extrasmall: '320px',
        md: '768px',

        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        'gt-america': ['"GT America Extended Regular"', 'sans-serif'],
        'gt-america-bold': ['"GT America Extended Bold"', 'sans-serif'],
        'gt-america-medium': ['"GT America Extended Medium"', 'sans-serif'],
        'gt-america-light': ['"GT America Extended Light"', 'sans-serif'],
        'gt-america-regular': ['"GT America Extended Regular"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
