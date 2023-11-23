<script setup>
import { computed } from "vue";
import { NInputNumber } from "naive-ui";
import { uiSize } from "@/config/naive-ui.js";

const props = defineProps({
  modelValue: {
    type: [Number, String, null],
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: "200",
  },
});
let emits = defineEmits(["update:modelValue"]);
const updateValue = (value) => {
  emits("update:modelValue", value);
};

let _width = computed(() => {
  return props.width == "auto" ? "100%" : `${props.width}px`;
});
</script>

<template>
  <n-input-number
    :value="props.modelValue"
    @update:value="updateValue"
    :size="uiSize"
    :style="{ width: _width }"
    clearable
  ></n-input-number>
</template>

<style lang="scss" scoped></style>
