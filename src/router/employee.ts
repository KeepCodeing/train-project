import { RouteRecordRaw } from "vue-router";

// 员工管理：包括员工CRUD和人事合同CRU
const routes: RouteRecordRaw[] = [
  {
    path: "/employee",
    name: "employee",
    redirect: "/employee/info",
    meta: {
      title: "员工管理",
      icon: "user-filled",
    },
    children: [
      {
        path: "emp_info",
        name: "emp_info",
        component: () => null,
        meta: { title: "信息管理", icon: "info-filled" },
      },
      {
        path: "contract",
        name: "contract",
        component: () => null,
        meta: { title: "合同管理", icon: "document" },
      },
    ],
  },
];

export default routes;
