import api from "./http";

export function register(data) {
  return api({
    url: "/users/register",
    method: "post",
    data,
  });
}

// 获取用户详细信息
export function getInfo() {
  return api({
    url: `/users/getInfo`,
    method: "get"
  });
}