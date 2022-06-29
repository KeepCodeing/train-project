import { RouteRecordRaw } from "vue-router";

// 个人信息和个人合同
const routes: RouteRecordRaw[] = [
  {
    path: "/personal",
    name: "personal",
    component: () => import("@views/index.vue"),
    redirect: "/personal/info",
    children: [
      {
        path: "info",
        name: "personal-info",
        component: () => import("@views/personal/info/index.vue"),
        meta: {
          hidden: true,
        },
      },
      {
        path: "contract",
        name: "personal-contract",
        component: () => import("@views/personal/contract/index.vue"),
        meta: {
          hidden: true,
        },
      },
    ],
  },
];

export default routes;
