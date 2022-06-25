import { RouteRecordRaw } from "vue-router";

// 任务管理，包括任务和个人工作总结页面
const routes: RouteRecordRaw[] = [
  {
    path: "/assignment",
    name: "assignment",
    component: () => import("@views/index.vue"),
    meta: { title: "任务管理", icon: "management" },
    children: [
      {
        path: "assignment_info",
        // 踩坑：name和path一样重要，可以作为路由唯一标识，如果
        // 出现重复可能导致路由匹配失败
        name: "assignment_info",
        component: () => import("@views/assignment/info/index.vue"),
        meta: { title: "任务列表", icon: "position" },
      },
      {
        path: "summary",
        name: "summary",
        component: () => import("@views/assignment/summary/index.vue"),
        meta: { title: "工作总结", icon: "collection-tag" },
      },
    ],
  },
];

export default routes;
