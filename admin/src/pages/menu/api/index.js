import api from "@/api/http.js";
const mockData = [
  {
    menuName: "系统管理",
    icon: "system",
    sort: 1,
    perms: "",
    component: "",
    status: 1,
    createTime: "2022-11-16 15:20:06",
    menuType: "M",
    menuId: 1,
    parentId: 0,
  },
  {
    menuName: "系统菜单",
    icon: "tree-table",
    sort: 1,
    perms: "system:menu:list",
    component: "system/menu/index",
    status: 1,
    createTime: "2022-11-16 15:20:06",
    menuType: "C",
    menuId: 102,
    parentId: 1,
  },
  {
    menuName: "菜单删除",
    icon: "",
    sort: 4,
    perms: "system:menu:remove",
    component: "",
    status: 0,
    createTime: "2022-11-16 15:20:06",
    menuType: "F",
    menuId: 1015,
    parentId: 102,
  },
  {
    menuName: "系统字典",
    icon: "education",
    sort: 2,
    perms: "",
    component: "wordbook/index",
    status: 1,
    createTime: "2022-11-16 15:20:06",
    menuType: "C",
    menuId: 1093,
    parentId: 1,
  },
  {
    menuName: "用户管理",
    icon: "peoples",
    sort: 5,
    perms: "",
    component: "",
    status: 1,
    createTime: "2022-11-16 15:20:06",
    menuType: "M",
    menuId: 1063,
    parentId: 0,
  },
  {
    menuName: "角色管理",
    icon: "people",
    sort: 5,
    perms: "",
    component: "user/role/index",
    status: 1,
    createTime: "2022-11-16 15:20:06",
    menuType: "C",
    menuId: 1067,
    parentId: 1063,
  },
  {
    menuName: "用户管理",
    icon: "user",
    sort: 1,
    perms: "",
    component: "user/user/index",
    status: 1,
    createTime: "2022-11-16 15:20:06",
    menuType: "C",
    menuId: 1064,
    parentId: 1063,
  },
];

// 列表数据
export function getTable(params) {
  // return api({
  //   url: "",
  //   method: 'get',
  //   params
  // })
  return new Promise((resolve, reject) => {
    let timer = null;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
}

// menu 详情
export function menuInfo(id) {
  // return api({
  //   url: "",
  //   method: "get",
  //   params: {
  //     id
  //   }
  // })
  return new Promise((resolve, reject) => {
    let timer = null;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      resolve("详情");
    }, 1000);
  });
}

// 删除 menu
export function delMenu(id) {
  // return api({
  //   url: '',
  //   method: 'delete',
  //   data: {
  //     id
  //   }
  // })
  return new Promise((resolve, reject) => {
    let timer = null;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      resolve(id);
    }, 1000);
  })
}