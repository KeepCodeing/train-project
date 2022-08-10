import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserInfo } from "@hooks/useUserInfo";
import gb from "../global/utils";

import Main from "./main";
import Employee from "./employee";
import Assignment from "./assignment";
import Enterprise from "./enterprise";
import Personal from "./personal";

// 考虑到大部分功能都是CRUD，所以没法做成子菜单，这里再对一些接口进行分类，这样
// 就能放到子菜单里了
// 留言暂且可以放在main里面

export const routes: RouteRecordRaw[] = [
  {
    path: "",
    redirect: "/dashboard",
    children: [],
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
      title: "登录",
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "notFound",
    component: () => import("@views/404.vue"),
    meta: {
      hidden: true,
    },
  },
  ...Main,
  ...Employee,
  ...Assignment,
  ...Enterprise,
  ...Personal,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 用户只有一个权限，所以不需要判断权限列表交集....
// 0: 普通用户 1：管理员

// 限定普通用户无法查看：
// 1. 员工管理
//  1.1 账号管理
//  1.2 合同管理
// 2.企业管理
//  2.1 部门管理
//  2.2 公告管理

router.beforeEach((to, from) => {
  const userInfo = useUserInfo();
  if (userInfo.checkUserInfo()) {
    if (to.name === "login") {
      router.replace(from.path);
      return false;
    } else {
      if (!to.meta.roles) return true;
      if (Array.isArray(to.meta.roles)) {
        const check = to.meta.roles.includes(userInfo.getUserInfo().status);
        // 直接用404页面代替401页面
        !check && router.replace("/404");
        return check;
      }

      return false;
    }
  } else {
    if (to.name !== "login") {
      router.replace("/login");
      gb.$baseMessage({ message: "请先登陆！", type: "error" });
      return false;
    }
    return true;
  }
});

export default router;
