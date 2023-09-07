<script setup>
import { reactive, ref } from "vue";
import { NInput, NSelect } from "naive-ui";
import YInput from "@/components/naive-ui/y-input.vue"

let searchForm = reactive({
  menuName: "",
  menuStatue: null,
});
let options = [
  {
    label: "启动",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
];
let tableData = reactive([]);
let tableLoading = ref(false);
let dialogShow = ref(false);
</script>

<template>
  <div class="g-box">
    1.{{ searchForm.menuName }}
    <div class="g-search-box">
      <y-input v-model="searchForm.menuName"></y-input>
      <!-- <n-input
        v-model:value="searchForm.menuName"
        placeholder="请输入目录名"
        clearable
      ></n-input> -->
      <!-- <n-select
        v-model:value="searchForm.menuStatue"
        placeholder="请选择目录状态"
        :options="options"
        clearable
      ></n-select> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
