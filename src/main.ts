import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index";
import gb from "./global/utils";

import "./assets/css/tailwind.css";
import "element-plus/dist/index.css";

import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

app.use(Router).use(gb).mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus, {
  locale: zhCn,
});
