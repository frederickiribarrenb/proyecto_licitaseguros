import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ipss': {
        target: 'https://clinicatecnologica.cl',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: '/proyecto_licitaseguros/',
})
