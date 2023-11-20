<script setup>
import { ref, computed, watch } from "vue";
import { NSelect } from "naive-ui";
import { uiSize } from "@/config/naive-ui";

const props = defineProps({
  modelValue: {
    type: [String, null, Number],
    required: true,
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
  <n-select
    :value="props.modelValue"
    @update:value="updateValue"
    :style="{ width: _width }"
    :size="uiSize"
    clearable
  ></n-select>
</template>
