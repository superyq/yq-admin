import { defineStore } from "pinia";
import { login, logout } from "@/api/login.js";
import { getInfo } from "@/api/user.js";
import { getToken, setToken, removeToken } from "@/utils/cookie.js";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => {
    return {
      token: getToken() || "",
      user: {},
      roles: [],
    };
  },
  getters: {
    ageAfter(state) {
      return state.user.age + 10;
    },
  },
  actions: {
    // 登录接口
    async login(data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            if (res.code !== 200) {
              return reject(res);
            }
            // 保存token
            setToken(res.token);
            this.token = res.token;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 退出接口
    async logout() {
      return new Promise((resolve, reject) => {
        // 前端测试，下面代码为静态登出，调试接口时请自己删除。
        removeToken();
        this.token = "";
        this.roles = [];
        resolve();

        // 调用后端接口，联调接口后自己取消注释
        // logout()
        //   .then((res) => {
        //     if (res.code !== 200) {
        //       reject(res);
        //     }
        //     this.roles = [];
        //     this.token = "";
        //     removeToken();
        //     resolve();
        //   })
        //   .catch((err) => {
        //     reject(err);
        //   });
      });
    },
    // 获取用户信息
    async getInfo() {
      return new Promise((resolve, reject) => {
        // 前端测试，下面代码为静态获取用户信息，调试登录请自己删除。
        // this.roles = ["admin"];
        // resolve();

        // 调用后端接口，联调接口后自己取消注释
        getInfo()
          .then((res) => {
            if (res.code !== 200) {
              return reject(res);
            }
            let { data } = res;
            console.log(data);
            this.roles = ["admin", ...data.roles];
            this.user = data;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
