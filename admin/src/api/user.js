import api from "./http";

export function register(data) {
  return api({
    url: "/users/register",
    method: "post",
    data,
  });
}
