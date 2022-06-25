import { RouteRecordRaw } from "vue-router";

// 企业管理，用来展示部门和企业信息
const routes: RouteRecordRaw[] = [
  {
    path: "/enterprise",
    name: "enterprise",
    redirect: "/enterprise/info",
    meta: { title: "企业管理", icon: "suitcase" },
    children: [
      {
        path: "info",
        name: "info",
        component: () => null,
        meta: { title: "企业信息", icon: "files" },
      },
      {
        path: "department",
        name: "department",
        component: () => null,
        meta: { title: "部门管理", icon: "data-analysis" },
      },
    ],
  },
];

export default routes;
