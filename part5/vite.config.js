import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    //describe, test and expect into the all tests file
    globals: true,
    setupFiles: './testSetup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
})
