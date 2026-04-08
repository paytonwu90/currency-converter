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
  test: {
    globals: true,           // 讓 describe, it, expect 變成全域，不用每個檔案 import
    environment: 'jsdom',    // 強制使用 jsdom 模擬瀏覽器
    setupFiles: './src/test/setup.js', // 測試啟動前的初始化檔案
  },
}))
