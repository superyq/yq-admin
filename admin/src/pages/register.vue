<script setup>
import { ref, reactive } from "vue";
import { NButton, NInput, NForm, NFormItem } from "naive-ui";
import router from "@/router/index.js";
import { register } from "@/api/user.js";

import CopeRight from "@/components/CopyRight.vue";

// 登录
let formRef = ref(null);
let form = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});
let rules = {
  username: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入用户名",
  },
  password: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入密码",
  },
  confirmPassword: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "请再次输入密码",
    },
    {
      validator: validatePasswordSame,
      trigger: ["blur", "password-input"],
      message: "两次密码输入不一致",
    },
  ],
};
let loginBtnState = ref(false);
function validatePasswordSame(rule, value) {
  return value === form.password;
}
let handleRegister = () => {
  loginBtnState.value = true;
  formRef.value?.validate((errors) => {
    if (!errors) {
      register(form)
        .then((data) => {
          if (data.code !== 200) {
            return (loginBtnState.value = false);
          }
          window.$msg.success("注册成功");
          router.push("/home");
        })
        .catch(() => {
          loginBtnState.value = false;
        });
    } else {
      loginBtnState.value = false;
    }
  });
};

function goBack() {
  router.push("/login");
}
</script>

<template>
  <div class="login-bg c-center">
    <div class="login__box">
      <div class="login-logo__box">
        <div class="login__title login-logo">注 册</div>
      </div>
      <n-form
        ref="formRef"
        class="login-form__box"
        :model="form"
        :rules="rules"
        label-placement="left"
      >
        <n-form-item path="username">
          <n-input
            class="login-input"
            v-model:value="form.username"
            placeholder="请输入账号"
          >
            <template #prefix>
              <svg-icon name="username" color="grey"></svg-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            class="login-input"
            v-model:value="form.password"
            placeholder="请输入密码"
            type="password"
            show-password-on="mousedown"
          >
            <template #prefix>
              <svg-icon name="password" color="grey"></svg-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="confirmPassword">
          <n-input
            class="login-input"
            v-model:value="form.confirmPassword"
            placeholder="请再次输入密码"
            type="password"
            show-password-on="mousedown"
          >
            <template #prefix>
              <svg-icon name="password" color="grey"></svg-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-button
          class="login-btn_login"
          type="info"
          @click="handleRegister"
          :loading="loginBtnState"
          :disabled="loginBtnState"
          >注册</n-button
        >
      </n-form>
      <div class="login-btn_forget" @click="goBack">返回登录</div>
    </div>
    <cope-right></cope-right>
  </div>
</template>

<style lang="scss">
.n-form-item {
  margin-top: -20px;
}
</style>

<style lang="scss" scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/imgs/login_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  .login__box {
    width: 425px;
    padding: 20px 40px;
    border-radius: 10px;
    background: rgba(2, 57, 104, 0.7);
    box-shadow: 0 0 30px rgba(2, 57, 104, 0.7);
    box-sizing: border-box;
    .login__title {
      font-size: 24px;
      text-align: center;
      color: #fff;
    }
  }
}

.login-title {
  margin-bottom: 15px;
  text-align: center;
  letter-spacing: 10px;
  font-size: 18px;
  color: #fff;
  opacity: 1;
}

.login-logo__box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  text {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    color: #1d69a3;

    &::before {
      content: "";
      display: inline-block;
      margin: 0 5px;
      width: 5px;
      height: 5px;
      background: gray;
      border-radius: 50%;
    }
  }
}

.login-logo {
  width: 55%;

  img {
    width: 100%;
    object-fit: cover;
  }
}

.login-code {
  .login-input_code {
    width: 240px;
  }

  .login-btn_code {
    color: #fff;
    margin-left: 20px;
  }
}

.login-btn_login {
  height: 40px;
  width: 100%;
}

.login-input {
  margin-top: 20px;
}

.login-btn_forget {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #71a1c5;
  cursor: pointer;
}

.login-code-img {
  margin-top: 20px;
  width: 30%;
  height: 35px;
  margin-left: 20px;
  object-fit: contain;
  cursor: pointer;
}
</style>
