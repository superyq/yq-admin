import api from "@/api/http.js";

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
      resolve(params);
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