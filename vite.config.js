import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // A transitive dependency pins an older three; keep a single copy in the graph.
    dedupe: ['three'],
  },
  server: {
    // Honour a port assigned by the in-app preview; fall back to Vite's default.
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
    include: ['src/**/*.test.{js,jsx}'],
  },
})
