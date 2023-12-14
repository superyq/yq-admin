<script setup>
import { ref, watch, computed } from "vue";
import { NForm, NFormItem, NTreeSelect } from "naive-ui";
import { menuInfo } from "@/pages/menu/api/index.js";
import { statusOp } from "@/options/index.js";
import { menuTypeOp, menuInputOp } from "@/pages/menu/options/index.js";
import { deepClone } from "@/utils/common.js";
import IconSelect from "@/pages/menu/components/IconSelect.vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  formId: Number,
  parentId: Number,
  options: {
    type: Array,
    required: true,
  },
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
    if (newValue && props.parentId) {
      formData.value.parentId = props.parentId;
    }
  }
);

const rules = {
  menuName: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入菜单名称",
  },
  sort: {
    required: true,
    message: "请输入排序",
  },
  path: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入路由地址",
  },
};
let defaultFormData = {
  parentId: 0,
  menuType: "M",
  icon: "",
  menuName: "",
  sort: 1,
  path: "",
  component: "",
  perms: "",
  status: 1,
};
let formData = ref(deepClone(defaultFormData));
const getDetail = () => {
  menuInfo(props.formId).then((data) => {
    formData.value = data;
  });
};

let formRef = ref(null);
let iconRef = ref(null);
let modelArr = computed(() => {
  return menuInputOp[formData.value.menuType];
});
const resetForm = () => {
  formData.value = deepClone(defaultFormData);
  iconRef.value?.resetPath();
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
const changeParentIdHandle = (newParentId) => {
  formData.value.parentId = newParentId;
};
const closeHandle = () => {
  dialogShow.value = false;
  emits("close");
};
</script>

<template>
  <y-modal v-model="dialogShow">
    <y-card title="新增菜单" @close="closeHandle">
      <div class="g-form__box">
        <n-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-placement="left"
          require-mark-placement="left"
          label-width="80"
        >
          <n-form-item path="parentId" label="上级菜单">
            <n-tree-select
              :value="formData.parentId"
              :options="options"
              @update:value="changeParentIdHandle"
              size="small"
            />
          </n-form-item>
          <n-form-item path="menuType" label="菜单类型">
            <y-radio
              v-model="formData.menuType"
              :options="menuTypeOp"
            ></y-radio>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('icon')"
            path="icon"
            label="菜单图标"
          >
            <IconSelect ref="iconRef" v-model="formData.icon" />
          </n-form-item>
          <n-form-item path="menuName" label="菜单名称">
            <y-input v-model="formData.menuName"></y-input>
          </n-form-item>
          <n-form-item path="sort" label="显示排序">
            <y-input-number v-model="formData.sort" :min="1"></y-input-number>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('path')"
            path="path"
            label="路由地址"
          >
            <y-input v-model="formData.path"></y-input>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('component')"
            path="component"
            label="组件路径"
          >
            <y-input v-model="formData.component"></y-input>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('perms')"
            path="perms"
            label="权限字符"
          >
            <y-input v-model="formData.perms"></y-input>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('status')"
            path="status"
            label="菜单状态"
          >
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
