/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/renderer/index.html',
    './src/renderer/src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Consolas', 'JetBrains Mono', 'Fira Code', 'monospace']
      }
    }
  },
  plugins: []
}
