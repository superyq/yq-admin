export default [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/register/index.vue"),
  },
  // 所有未知页面都是404
  {
    path: "/:catchAll(.*)",
    component: () => import("@/pages/404/index.vue"),
  },
  {
    component: () => import("@/pages/layout/index.vue"),
    children: [
      {
        path: "/demo",
        name: "demo",
        meta: {
          title: "demo",
        },
        component: () => import("@/pages/demo/index.vue"),
      },
      {
        path: "/userinfo",
        name: "userinfo",
        meta: {
          title: "个人信息",
        },
        component: () => import("@/pages/userinfo/index.vue"),
      },
      {
        path: "/editpassword",
        name: "editpassword",
        meta: {
          title: "修改密码",
        },
        component: () => import("@/pages/editpassword/index.vue"),
      },
      {
        path: "/dictenum/:id",
        name: "dictenum",
        meta: {
          title: "字典数据",
        },
        component: () => import("@/pages/dictenum/index.vue"),
      },
    ],
  },
];
