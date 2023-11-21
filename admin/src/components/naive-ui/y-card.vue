<script setup>
import { NCard } from "naive-ui";
import { uiSize } from "@/config/naive-ui.js";

const props = defineProps({
  title: {
    type: String,
  },
});
const emits = defineEmits(["close"]);

let closeHandle = () => {
  emits("close");
};
</script>

<template>
  <n-card
    :title="title"
    :size="uiSize"
    style="width: 600px"
    :bordered="true"
    closable
    @close="closeHandle"
  >
    <slot></slot>
    <template #action>
      <slot name="action"></slot>
    </template>
  </n-card>
</template>

<style lang="scss" scoped></style>
