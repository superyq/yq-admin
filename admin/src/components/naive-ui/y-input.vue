<script setup>
import { computed } from "vue";
import { NInput } from "naive-ui";

const props = defineProps({
  modelValue: {
    type: String,
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
  <n-input
    :value="props.modelValue"
    @input="updateValue"
    size="small"
    :style="{ width: _width }"
    clearable
  ></n-input>
</template>
