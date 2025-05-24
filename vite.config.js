import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    // Add the proxied domain to allowedHosts
    allowedHosts: ['5173-ii83p03wkoefntt9sixs0-c5ec4ee1.manusvm.computer'],
    // Ensure the server listens on all interfaces
    host: '0.0.0.0'
  },
  build:{
    outDir:'dist',
  }
})

