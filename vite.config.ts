import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Mais Gestão — porta 3002
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

