module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f0f0f',
          800: '#1a1a1a',
          700: '#2d2d2d',
          600: '#404040',
          500: '#535353'
        },
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      }
    }
  },
  plugins: []
}
