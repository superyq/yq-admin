<script setup>
import { computed } from "vue";
import { NDataTable } from "naive-ui";

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
</script>

<template>
  <n-data-table
    :single-line="false"
    size="small"
    striped
    :max-height="height"
    :min-height="height"
  ></n-data-table>
</template>

<style lang="scss" scope></style>
