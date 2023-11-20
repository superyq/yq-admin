export const routerData = [
  {
    name: "home",
    path: "/home",
    hidden: false,
    component: "home",
    meta: {
      title: "首页",
      icon: "home",
    },
    children: null,
  },
  {
    name: "system",
    path: "/system",
    hidden: false,
    component: null,
    meta: {
      title: "系统管理",
      icon: "system",
    },
    children: [
      {
        name: "menu",
        path: "/menu",
        hidden: false,
        component: "menu",
        meta: {
          title: "系统菜单",
          icon: "",
        },
        children: null,
      },
      {
        name: "dict",
        path: "/dict",
        hidden: false,
        component: "dict",
        meta: {
          title: "系统字典",
          icon: "",
        },
        children: null,
      },
    ],
  },
  {
    name: "",
    path: "",
    hidden: false,
    component: null,
    meta: {
      title: "用户管理",
      icon: "user",
    },
    children: [
      {
        name: "user",
        path: "/user",
        hidden: false,
        component: "user",
        meta: {
          title: "用户管理",
          icon: "",
        },
        children: null,
      },
      {
        name: "role",
        path: "/role",
        hidden: false,
        component: "role",
        meta: {
          title: "角色管理",
          icon: "",
        },
        children: null,
      },
    ],
  },
  {
    name: "components",
    path: "/components",
    hidden: false,
    component: null,
    meta: {
      title: "自定义组件",
      icon: "user",
    },
    children: [
      {
        name: "quill",
        path: "/quill",
        hidden: false,
        component: "quill",
        meta: {
          title: "quill 富文本",
          icon: "",
        },
        children: null,
      },
    ],
  },
];
