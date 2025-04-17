import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/vite-react-test2/', // 注意這個名稱要跟 GitHub repo 名稱一致
})
