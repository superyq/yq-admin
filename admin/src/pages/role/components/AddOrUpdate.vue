<script setup>
import { ref, watch, computed } from "vue";
import { NForm, NFormItem } from "naive-ui";
import { demoInfo } from "@/pages/role/api/index.js";
import { statusOp } from "@/options/index.js";
import { deepClone } from "@/utils/common.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  formId: Number,
});
const emits = defineEmits(["close"]);

let dialogShow = ref(false);
watch(
  () => props.show,
  (newValue) => {
    dialogShow.value = newValue;
    newValue && resetForm();
    if (newValue && props.formId != null) {
      getDetail();
    }
  }
);

let defaultFormData = {
  roleId: null,
  roleName: "",
  remark: "",
  sort: 1,
  status: 0,
  menuIds: [],
};
let formData = ref(deepClone(defaultFormData));
const rules = {
  roleName: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入角色名称",
  },
  remark: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入角色描述",
  },
  menuIds: {
    required: true,
    trigger: ["input", "blur"],
    message: "请选择权限",
  },
};
const getDetail = () => {
  demoInfo(props.formId).then((data) => {
    formData.value = data;
  });
};

let formRef = ref(null);
const resetForm = () => {
  formData.value = deepClone(defaultFormData);
};
const handleSubmit = (e) => {
  e.preventDefault();
  formRef.value?.validate((errs) => {
    if (!errs) {
      window.$msg.success("成功");
    } else {
      window.$msg.error("失败");
    }
  });
};
const closeHandle = () => {
  dialogShow.value = false;
  emits("close");
};
</script>

<template>
  <y-modal v-model="dialogShow">
    <y-card title="新增" @close="closeHandle">
      <div class="g-form__box">
        <n-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-placement="left"
          require-mark-placement="left"
          label-width="80"
        >
          <n-form-item path="roleName" label="角色名称">
            <y-input v-model="formData.roleName"></y-input>
          </n-form-item>
          <n-form-item path="remark" label="角色描述">
            <y-input v-model="formData.remark"></y-input>
          </n-form-item>
          <n-form-item path="sort" label="排序">
            <y-input v-model="formData.sort"></y-input>
          </n-form-item>
          <n-form-item path="status" label="状态">
            <y-radio v-model="formData.status" :options="statusOp"></y-radio>
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <y-button class="btn-submit" type="success" @click="handleSubmit"
          >提交</y-button
        >
        <y-button type="info" @click="resetForm">重置</y-button>
      </template>
    </y-card>
  </y-modal>
</template>

<style lang="scss" scoped>
.btn-submit {
  margin: 0 20px 0 30px;
}
</style>
