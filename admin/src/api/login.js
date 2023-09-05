import api from "./http.js";
 
// 登录
export function login(data) {
  return api({
    url: `/login`,
    headers: {
      isToken: false,
    },
    method: "post",
    data,
  });
}
 
// 退出
export function logout() {
  return api({
    url: `/auth/logout`,
    method: "delete",
  });
}
 
// 获取验证码
export function getCodeImg() {
  return api({
    url: `/code`,
    headers: {
      isToken: false,
    },
    method: "get",
  });
}