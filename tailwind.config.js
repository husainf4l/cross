/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Add this line to scan all HTML and TypeScript files in src
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['print'], // Enable `print` variant for `display`
    },
  },

  plugins: [],
};
