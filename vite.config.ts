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

  resolve: {
    alias: {
      "@components": "/src/components",
      "@views": "/src/view",
      "@api": "/src/service",
    },
  },
});
