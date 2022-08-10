import { defineConfig } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver()],
    }),
    Icons(),
  ],

  server: {
    // proxy: {
    //   "^/api": {
    //     target: "http://huiyuanai.cloud:8091",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    proxy: {
      "/api": {
        target: "http://huiyuanai.cloud:8091",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  resolve: {
    alias: {
      "@components": "/src/components",
      "@views": "/src/view",
      "@service": "/src/service",
      "@hooks": "/src/hooks",
    },
  },
});
