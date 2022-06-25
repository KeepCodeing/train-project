import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Main from "./main";
import Employee from "./employee";
import Assignment from "./assignment";
import Enterprise from "./enterprise";

// 考虑到大部分功能都是CRUD，所以没法做成子菜单，这里再对一些接口进行分类，这样
// 就能放到子菜单里了
// 留言暂且可以放在main里面

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: {
      hidden: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@views/login/index.vue"),
    meta: {
      hidden: true,
      title: "登陆",
    },
  },
  ...Main,
  ...Employee,
  ...Assignment,
  ...Enterprise,
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
