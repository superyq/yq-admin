<script setup>
import { computed } from "vue";
import { NDataTable } from "naive-ui";
import { uiSize } from "@/config/naive-ui";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

let height = computed(() => {
  const w_h = window.innerHeight;
  if (w_h <= 740) {
    return 400;
  }
  if (w_h > 740 && w_h <= 900) {
    return 500;
  }
  if (w_h > 900) {
    return 600;
  }
});
let scrollX = computed(() => {
  return window.innerWidth - 195;
});
</script>

<template>
  <n-data-table
    :loading="loading"
    :single-line="false"
    :size="uiSize"
    striped
    :max-height="height"
    :min-height="height"
    :scroll-x="scrollX"
  ></n-data-table>
</template>

<style lang="scss" scope></style>
