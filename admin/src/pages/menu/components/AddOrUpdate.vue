<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import { menuInfo } from "@/pages/menu/api/index.js";
import { NForm, NFormItem } from "naive-ui";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  menuId: Number,
});
const emits = defineEmits(["close"]);

const dialogShow = ref(false);
watch(
  () => props.show,
  (newValue) => {
    dialogShow.value = newValue;
    if (newValue && props.menuId != null) {
      getDetail();
    }
  }
);
let closeHandle = () => {
  dialogShow.value = false;
  emits("close");
};

let getDetail = () => {
  console.log("详情");
  menuInfo(props.menuId).then((data) => {
    console.log(1, data);
  });
};

let model = reactive({
  menuName: "",
  sort: "1",
});
const rules = {
  menuName: [
    {
      required: true,
      trigger: ["input", "blur"],
    },
  ],
  sort: {
    required: true,
    trigger: ["input", "blur"],
  },
};
</script>

<template>
  <y-modal v-model="dialogShow">
    <y-card title="新增菜单1" @close="closeHandle">
      <div class="g-form__box">
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item path="menuName" label="菜单">
            <y-input v-model="model.menuName"></y-input>
          </n-form-item>
          <n-form-item path="sort" label="排序">
            <y-input v-model="model.sort"></y-input>
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <y-button type="success">提交</y-button>
      </template>
    </y-card>
  </y-modal>
</template>

<style lang="scss" scoped></style>
