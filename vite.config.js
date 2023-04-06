import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/assets/scss/common.scss";
      `
      }
    }
  },
  server: {
    open: true,
  },
})
