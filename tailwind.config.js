/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['PT Sans', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      maxWidth: {
        30: '30ch',
      },
      boxShadow: {
        th: '0 1px 0 0 rgba(229, 231, 235, 1)',
      },
      colors: {
        link: '#0070f3',
        'link-hover': '#3291ff',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
