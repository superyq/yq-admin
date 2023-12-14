import api from "@/api/http.js";
import { tableData, detailData } from "@/pages/1a/mock/index.js";

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
      resolve(tableData);
    }, 1000);
  });
}

// demo 详情
export function demoInfo(id) {
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
      resolve(detailData);
    }, 1000);
  });
}

// 删除 demo
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
  });
}

// 修改状态
export function changeStatus(id, status) {
  // return api({
  //   url: "",
  //   method: 'post',
  //   data: {
  //     id,
  //     status
  //   }
  // })
  return new Promise((resolve, reject) => {
    let timer = null;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      resolve("修改成功");
    }, 1000);
  });
}
