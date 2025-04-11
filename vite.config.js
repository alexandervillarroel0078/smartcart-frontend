import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path' // <== ESTO FALTABA
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html') // <== Asegúrate que apunta bien
      }
    }
  }
})
