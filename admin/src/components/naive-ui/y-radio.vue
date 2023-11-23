<script setup>
import { NRadioGroup, NRadio } from "naive-ui";
import { uiSize } from "@/config/naive-ui.js";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);

let changeValue = (value) => {
  emits("update:modelValue", value);
};
</script>

<template>
  <n-radio-group
    :value="modelValue"
    name="radiogroup"
    @update:value="changeValue"
    :size="uiSize"
  >
    <n-radio v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </n-radio>
  </n-radio-group>
</template>

<style lang="scss" scoped></style>
