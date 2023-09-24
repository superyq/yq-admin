<script setup>
import { NButton } from "naive-ui";

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
  <n-button size="small" :icon-placement="right ? 'right' : 'left'">
    <slot></slot>
    <template #icon v-if="icon">
      <svg-icon :name="icon" width="17"></svg-icon>
    </template>
  </n-button>
</template>

<style lang="scss" scoped></style>
