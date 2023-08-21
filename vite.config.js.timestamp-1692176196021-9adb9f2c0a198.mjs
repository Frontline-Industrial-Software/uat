// vite.config.js
import { defineConfig } from "file:///D:/Work/v3-WorkProject/frontline/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Work/v3-WorkProject/frontline/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/Work/v3-WorkProject/frontline/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Work/v3-WorkProject/frontline/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/Work/v3-WorkProject/frontline/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
    // Enabled by default
  ],
  base: "./",
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
      "@": path.resolve("./src")
      // @代替src
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXHYzLVdvcmtQcm9qZWN0XFxcXGZyb250bGluZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya1xcXFx2My1Xb3JrUHJvamVjdFxcXFxmcm9udGxpbmVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmsvdjMtV29ya1Byb2plY3QvZnJvbnRsaW5lL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy95YXJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgIH0pLFxuICAgIC8vIEVuYWJsZWQgYnkgZGVmYXVsdFxuICBdLFxuICBiYXNlOiAnLi8nLFxuXG4gIC8vIHNlcnZlOntcbiAgLy8gICBzZXJ2ZXI6IHtcbiAgLy8gICAgIHByb3h5OiB7XG4gIC8vICAgICAgICcvd3NVcmwnOiB7XG4gIC8vICAgICAgICAgdGFyZ2V0OiAnd3NzOi8vMTguMTM4LjExLjIwMTonLCAvL1x1NzZFRVx1NjgwN3VybFxuICAvLyAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy9cdTY1MkZcdTYzMDFcdThERThcdTU3REZcbiAgLy8gICAgICAgICB3czogdHJ1ZSxcbiAgLy8gICAgICAgICByZXdyaXRlOiAocGF0aCk9PiBwYXRoLnJlcGxhY2UoL35cXC93c1VybC8sXCJcIiksIC8vXHU2MkU2XHU2MjJBXHU4REVGXHU1Rjg0XHU1M0JCXHU5NjY0XG4gIC8vICAgICAgICAgICAvL1x1OTFDRFx1NTE5OVx1OERFRlx1NUY4NCxcdTY2RkZcdTYzNjIvYXBpXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoJy4vc3JjJykgLy8gQFx1NEVFM1x1NjZGRnNyY1xuICAgIH1cbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBSLFNBQVMsb0JBQW9CO0FBQ3ZULE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLFVBQVU7QUFFakIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBO0FBQUEsRUFFSDtBQUFBLEVBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFlTixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxPQUFPO0FBQUE7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
