import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/dashbord",
    name: "",
    component: () => "",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
