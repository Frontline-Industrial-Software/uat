import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path"
// https://vitejs.dev/config/yar
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // Enabled by default
  ],
  // serve:{
  //   server: {
  //     proxy: {
  //       '/api': {
  //         target: 'http://70f626fa.r5.cpolar.top', //目标url
  //         changeOrigin: true, //支持跨域
  //         rewrite: (path) => path.replace(/^\/api/, ""), 
  //           //重写路径,替换/api
  //       }
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': path.resolve('./src') // @代替src
    }
  }
});
