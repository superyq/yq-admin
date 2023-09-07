<script setup>
const props = defineProps({
  modelValue: String,
});

let emit = defineEmits(["update:modelValue"]);
const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div>
    <input :value="props.modelValue" @input="updateValue" />
    <span>子组件：{{ props.modelValue }}</span>
  </div>
</template>
