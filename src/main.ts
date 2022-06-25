import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index";
import gb from "./global/utils";
import "./assets/css/tailwind.css";

const app = createApp(App);

app.use(Router).use(gb).mount("#app");
