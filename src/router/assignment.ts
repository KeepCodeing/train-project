import { RouteRecordRaw } from "vue-router";

// 任务管理，包括任务和个人工作总结页面
const routes: RouteRecordRaw[] = [
  {
    path: "/assignment",
    name: "assignment",
    redirect: "/assignment/info",
    meta: { title: "任务管理", icon: "management" },
    children: [
      {
        path: "info",
        name: "info",
        component: () => null,
        meta: { title: "任务列表", icon: "tickets" },
      },
      {
        path: "summary",
        name: "summary",
        component: () => null,
        meta: { title: "工作总结", icon: "collection-tag" },
      },
    ],
  },
];

export default routes;
