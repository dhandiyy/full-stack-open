import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    //using globals:true to make describe, test and expect into the all tests file
    globals: true,
    setupFiles: './testSetup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
})
