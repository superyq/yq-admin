<script setup>
import { ref, watch, computed } from "vue";
import { NForm, NFormItem } from "naive-ui";
import { demoInfo } from "@/pages/user/api/index.js";
import { statusOp } from "@/options/index.js";
import { sexOp } from "@/pages/user/options/index.js";
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
  // 用户信息
  userId: "",
  realName: "",
  remark: "",
  phonenumber: "",
  identityCard: "",
  sex: "0",
  email: "",
  status: 0,
  // 账号信息
  userName: "",
  password: "",
  // 分配角色
  roleIds: [],
};
let formData = ref(deepClone(defaultFormData));
const rules = {
  realName: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入真实姓名",
  },
  phonenumber: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入手机号",
  },
  identityCard: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入身份证",
  },
  email: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入邮箱",
  },
  userName: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入账号名",
  },
};
const getDetail = () => {
  demoInfo(props.formId).then((data) => {
    console.log('detail', data);
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
          <n-form-item path="realName" label="真实姓名">
            <y-input v-model="formData.realName"></y-input>
          </n-form-item>
          <n-form-item path="remark" label="用户描述">
            <y-input v-model="formData.remark"></y-input>
          </n-form-item>
          <n-form-item path="phonenumber" label="手机号码">
            <y-input v-model="formData.phonenumber"></y-input>
          </n-form-item>
          <n-form-item path="identityCard" label="身份证号">
            <y-input v-model="formData.identityCard"></y-input>
          </n-form-item>
          <n-form-item path="sex" label="性别">
            <y-radio v-model="formData.sex" :options="sexOp"></y-radio>
          </n-form-item>
          <n-form-item path="email" label="邮箱地址">
            <y-input v-model="formData.email"></y-input>
          </n-form-item>
          <n-form-item path="userName" label="登录账号">
            <y-input v-model="formData.userName"></y-input>
          </n-form-item>
          <n-form-item path="password" label="密码">
            <y-input v-model="formData.password"></y-input>
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
