import { RouteRecordRaw } from "vue-router";

// 企业管理，用来展示部门和企业信息
const routes: RouteRecordRaw[] = [
  {
    path: "/enterprise",
    name: "enterprise",
    component: () => import("@views/index.vue"),
    meta: { title: "企业管理", icon: "suitcase" },
    children: [
      {
        path: "info",
        name: "info",
        component: () => import("@views/enterprise/info/index.vue"),
        meta: { title: "企业信息", icon: "place" },
      },
      {
        path: "department",
        name: "department",
        component: () => import("@views/enterprise/department/index.vue"),
        meta: { title: "部门管理", icon: "data-analysis" },
      },
      {
        path: "announcement",
        name: "announcement",
        component: () => import("@views/enterprise/announcement/index.vue"),
        meta: { title: "公告管理", icon: "bell" },
      },
    ],
  },
];

export default routes;
