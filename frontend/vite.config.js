// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
}