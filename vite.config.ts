import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three.js ships as its own lazily-loaded chunk (~136 kB gzip), only fetched for the hero.
    chunkSizeWarningLimit: 600,
  },
})
