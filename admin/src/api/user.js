import api from "./http";

export function register(data) {
  return api({
    url: "/users/register",
    method: "post",
    headers: {
      isToken: false,
    },
    data,
  });
}

// 获取用户详细信息
export function getInfo() {
  return api({
    url: `/users/userinfo`,
    headers: {
      isToken: false
    },
    method: "get"
  });
}

// 更新用户信息
export function updateUserinfo(data) {
  return api({
    url: "/users/userinfo",
    method: 'post',
    data
  })
}

// 更换用户头像
export function updateAvatar(data) {
  return api({
    url: '/users/avatar',
    method: 'post',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data
  })
}