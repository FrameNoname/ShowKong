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
        feed: resolve(import.meta.dirname, 'pages/feed.html'),
        findTeam: resolve(import.meta.dirname, 'pages/find-team.html'),
        teamDetail: resolve(import.meta.dirname, 'pages/team-detail.html'),
        post: resolve(import.meta.dirname, 'pages/post.html'),
        showKong: resolve(import.meta.dirname, 'pages/show-kong.html'),
        showcase: resolve(import.meta.dirname, 'pages/showcase.html'),
      },
    },
  },
})
