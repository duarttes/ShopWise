import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['exam-released-phrase-whale.trycloudflare.com'],
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('recharts')) return 'charts';
          if (id.includes('leaflet')) return 'map';
          if (id.includes('@phosphor-icons')) return 'icons';
          if (id.includes('html5-qrcode')) return 'qr';
          if (id.includes('node_modules/react')) return 'react-vendor';
        },
      },
    },
  },
})