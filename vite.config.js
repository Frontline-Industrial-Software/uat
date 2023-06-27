import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/yar
export default defineConfig({
  plugins: [vue(),
   // Enabled by default
],
  define: {
    global: {},
  },
  
})
