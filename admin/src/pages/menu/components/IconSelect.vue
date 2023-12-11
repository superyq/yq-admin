<script setup>
import { ref, watch, onMounted } from "vue";
import { NPopover } from "naive-ui";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  }
});
const emits = defineEmits(["update:modelValue"]);

onMounted(() => {
  iconPath.value = props.modelValue;
})

const iconsPath = import.meta.globEager("@/assets/svg/*.svg");
const icons = Object.keys(iconsPath).map((item) =>
  item.replace(/\/src\/assets\/svg\//, "").replace(/\.svg/, "")
);

let iconPath = ref("");
let selectHandle = (icon) => {
  iconPath.value = icon;
  show.value = false;
};
let handleUpdateShow = (value) => {
  !value && (show.value = false);
};

let show = ref(false);
let showChange = () => {
  show.value = true;
};

watch(iconPath, (newValue) => {
  emits('update:modelValue', newValue);
})

let resetPath = () => {
  iconPath.value = "";
}
defineExpose({
  resetPath
})
</script>

<template>
  <n-popover
    :show="show"
    trigger="click"
    placement="bottom-start"
    @update:show="handleUpdateShow"
  >
    <template #trigger>
      <y-input v-model="iconPath" :icon="iconPath" @click="showChange"></y-input>
    </template>
    <div class="icons-box">
      <div
        v-for="(icon, index) in icons"
        :key="index"
        @click="selectHandle(icon)"
      >
        <svg-icon :name="icon"></svg-icon>
        <span>{{ icon }}</span>
      </div>
    </div>
  </n-popover>
</template>

<style lang="scss" scoped>
.icons-box {
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  & > div {
    margin-top: 5px;
    width: 120px;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
}
</style>
