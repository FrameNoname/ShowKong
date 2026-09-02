import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        login: resolve(import.meta.dirname, 'pages/login.html'),
        register: resolve(import.meta.dirname, 'pages/register.html'),
      },
    },
  },
})

