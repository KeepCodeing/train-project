import { RouteRecordRaw } from "vue-router";

// 主面板，用来展示企业信息（轮播图）和任务、留言等消息的入口
const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    redirect: "/dashboard/home",
    children: [
      {
        path: "/home",
        component: () => import("@views/dashboard/home.vue"),
        meta: {
          title: "公司首页",
          icon: "connection",
        },
      },
      {
        path: "/message",
        component: () => import("@views/dashboard/message.vue"),
        meta: {
          title: "我的留言",
          icon: "comment",
        },
      },
    ],
    meta: {
      title: "控制面板",
      icon: "home-filled",
    },
  },
];

export default routes;
