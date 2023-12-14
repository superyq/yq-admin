<script setup>
import { ref, watch, computed } from "vue";
import { NForm, NFormItem } from "naive-ui";
import { dictInfo } from "@/pages/dict/api/index.js";
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
let formRef = ref(null);
const rules = {
  dictName: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入字典名称",
  },
  dictType: {
    required: true,
    message: "请输入字典类型",
  },
};
let defaultFormData = {
  dictId: 0,
  dictName: "",
  dictType: "",
  remark: "",
  status: 1,
};
let formData = ref(deepClone(defaultFormData));
const getDetail = () => {
  dictInfo(props.formId).then((data) => {
    formData.value = data;
  });
};
const closeHandle = () => {
  dialogShow.value = false;
  emits("close");
};
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

</script>

<template>
  <y-modal v-model="dialogShow">
    <y-card title="新增字典" @close="closeHandle">
      <div class="g-form__box">
        <n-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-placement="left"
          require-mark-placement="left"
          label-width="80"
        >
          <n-form-item path="dictName" label="字典名称">
            <y-input v-model="formData.dictName"></y-input>
          </n-form-item>
          <n-form-item path="dictType" label="字典类型">
            <y-input v-model="formData.dictType"></y-input>
          </n-form-item>
          <n-form-item path="remark" label="字典备注">
            <y-input v-model="formData.remark"></y-input>
          </n-form-item>
          <n-form-item path="status" label="字典状态">
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
