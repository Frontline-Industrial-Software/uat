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
  //       '/wsUrl': {
  //         target: 'wss://18.138.11.201:', //目标url
  //         changeOrigin: true, //支持跨域
  //         ws: true,
  //         rewrite: (path)=> path.replace(/~\/wsUrl/,""), //拦截路径去除
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
