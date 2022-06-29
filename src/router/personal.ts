import { RouteRecordRaw } from "vue-router";

// 个人信息和个人合同
const routes: RouteRecordRaw[] = [
    {
        path: "/personal",
        name: "personal",
        component: () => import("@views/index.vue"),
        children: [
            {
                path: "info",
                name: "info",
                component: () => import("@views/personal/info/index.vue"),

            },
            {
                path: "contract",
                name: "contract",
                component: () => import("@views/personal/contract/index.vue"),
            },
        ],
    },
];

export default routes;
