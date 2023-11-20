<script setup>
import { NButton } from "naive-ui";
import { uiSize } from "@/config/naive-ui";

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  right: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <n-button :size="uiSize" :icon-placement="right ? 'right' : 'left'">
    <slot></slot>
    <template #icon v-if="icon">
      <svg-icon :name="icon" width="17"></svg-icon>
    </template>
  </n-button>
</template>

<style lang="scss" scoped></style>
