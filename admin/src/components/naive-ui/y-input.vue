<script setup>
import { computed } from "vue";
import { NInput } from "naive-ui";
import { uiSize } from "@/config/naive-ui";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String,
    default: ''
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
  <n-input
    :value="props.modelValue"
    @input="updateValue"
    :size="uiSize"
    :style="{ width: _width }"
    clearable
  >
    <template #prefix>
      <svg-icon v-if="icon" :name="icon"></svg-icon>
    </template>
  </n-input>
</template>
