import { RouteRecordRaw } from "vue-router";

// 员工管理：包括员工CRUD和人事合同CRU
const routes: RouteRecordRaw[] = [
  {
    path: "/employee",
    name: "employee",
    component: () => import("@views/index.vue"),
    meta: {
      title: "员工管理",
      icon: "user-filled",
    },
    children: [
      {
        path: "emp_info",
        name: "emp_info",
        component: () => import("@views/employee/info/index.vue"),
        meta: { title: "信息管理", icon: "info-filled" },
      },
      {
        path: "contract",
        name: "contract",
        component: () => import("@views/employee/contract/index.vue"),
        meta: { title: "合同管理", icon: "document" },
      },
    ],
  },
];

export default routes;
