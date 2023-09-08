<script setup>
import { ref, computed, watch } from "vue";
import { NSelect } from "naive-ui";

const props = defineProps({
  modelValue: {
    type: [String, null, Number],
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
  width: {
    type: [String, Number],
    default: "200",
  },
  ph: {
    type: String,
    default: "请输入",
  },
});
let emits = defineEmits(["update:modelValue"]);
const updateValue = (value) => {
  console.log(value);
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
    :options="options"
    :placeholder="ph"
    :style="{ width: _width }"
    size="small"
    clearable
  ></n-select>
</template>
