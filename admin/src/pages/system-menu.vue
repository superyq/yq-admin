<script setup>
import { reactive, ref } from "vue";
import { NButton } from "naive-ui";
// import YInput from "@/components/naive-ui/y-input.vue";
// import YSelect from "@/components/naive-ui/y-select.vue";
// import YButton from "@/components/naive-ui/y-button.vue";

let searchForm = reactive({
  menuName: "啦啦啦",
  menuStatue: 1,
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
    <div class="g-search-box">
      <y-input v-model="searchForm.menuName" ph="请输入目录名"></y-input>
      <y-select
        v-model="searchForm.menuStatue"
        :options="options"
        ph="请选择目录状态"
      ></y-select>
    </div>
    <div class="g-control-box">
      <div class="g-control__add">
        <y-button size="small">新增</y-button>
      </div>
      <div class="g-control__search">
        <n-button>筛选</n-button>
        <n-button>重置</n-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
