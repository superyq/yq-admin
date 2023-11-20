<script setup>
import { ref, watch } from "vue";
import { NPagination } from "naive-ui";
import { uiSize } from "@/config/naive-ui";

const props = defineProps({
  pages: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["pageChange", "pageSizeChange"]);

let current = ref(null);
let pageSize = ref(null);
let total = ref(null);
watch(
  props.pages,
  (newPages) => {
    current.value = newPages.current;
    pageSize.value = newPages.pageSize;
    total.value = newPages.total;
  },
  { immediate: true, deep: true }
);

const pageChange = (page) => {
  emits("pageChange", page);
};
const pageSizeChange = (pageSize) => {
  emits("pageSizeChange", pageSize);
};
</script>

<template>
  <n-pagination
    v-model:page="current"
    v-model:page-size="pageSize"
    :item-count="total"
    :page-sizes="[10, 20, 30, 40]"
    show-size-picker
    :size="uiSize"
    @update:page="pageChange"
    @update:page-size="pageSizeChange"
  />
</template>
