import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { qrcode } from 'vite-plugin-qrcode'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/currency-converter/' : '/',
  plugins: [
    react(), 
    tailwindcss(),
    qrcode(),
  ],
  server: {
    host: true, // 讓手機也能訪問
  },
}))
