<script setup>
import { computed } from "vue";
import { NButton, useDialog } from "naive-ui";
import router from "@/router/index.js";
import { useUserStore } from "@/store/user.js";
 
let userStore = useUserStore();
 
let user = computed(() => {
  return userStore.user;
})
 
let ageAfter = computed(() => {
  return userStore.ageAfter;
})
 
let toPage = (name) => {
  router.push({ name });
};
 
let handleShowMsg = () => {
  window.$msg.success("success message");
};
 
const dialog = useDialog();
let handleShowDialog = () => {
  dialog.warning({
    title: "警告",
    content: "你确定？",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      window.$msg.success("确定");
    },
    onNegativeClick: () => {
      window.$msg.error("不确定");
    },
  });
};
</script>
 
<template>
  <div class="home">
    home
  </div>
</template>
 
<style lang="scss" scoped></style>