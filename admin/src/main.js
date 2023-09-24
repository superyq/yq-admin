import { createApp } from "vue";
import App from "./App.vue";

// 共用样式
import "@/assets/style/index.scss";
// 路由
import router from "@/router/index.js";
// store 状态管理
import { createPinia } from "pinia";

// svg 组件
import SvgIcon from "@/components/SvgIcon.vue";
import "virtual:svg-icons-register";

// 二次封装naive-ui组件批量引入
import initC from "./components/naive-ui";

const app = createApp(App);

initC(app);
app.use(createPinia()).component("svg-icon", SvgIcon).use(router).mount("#app");
