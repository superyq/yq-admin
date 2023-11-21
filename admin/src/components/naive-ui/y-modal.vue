<script setup>
import { NModal } from "naive-ui";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);
const updateValue = (value) => {
  emits("update:modelValue", value)
}
</script>

<template>
  <n-modal
    :show="modelValue"
    transform-origin="center"
    :mask-closable="false"
    @update:show="updateValue"
  >
    <slot></slot>
  </n-modal>
</template>

<style lang="scss" scoped></style>
