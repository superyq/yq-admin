import api from "@/api/http.js";

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
