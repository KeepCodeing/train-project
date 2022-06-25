import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index";
import gb from "./global/utils";

import "./assets/css/tailwind.css";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

app.use(Router).use(gb).mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
