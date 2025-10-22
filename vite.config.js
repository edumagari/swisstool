import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Serve static assets from local `public/` (copied into dist automatically)
  publicDir: 'public',
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
