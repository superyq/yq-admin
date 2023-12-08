<script setup>
import { ref, watch, reactive, computed } from "vue";
import { NForm, NFormItem, NTreeSelect } from "naive-ui";
import { menuInfo } from "@/pages/menu/api/index.js";
import {
  menuTypeOp,
  statusOp,
  menuInputOp,
} from "@/pages/menu/options/index.js";
import { deepClone } from "@/utils/common.js";
import IconSelect from "@/pages/menu/components/IconSelect.vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  menuId: Number,
  options: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["close"]);

const dialogShow = ref(false);
watch(
  () => props.show,
  (newValue) => {
    dialogShow.value = newValue;
    defaultModel = deepClone(model);
    if (newValue && props.menuId != null) {
      getDetail();
    }
  }
);
let closeHandle = () => {
  dialogShow.value = false;
  emits("close");
};

let model = reactive({
  parentId: 0,
  menuType: "M",
  icon: "",
  menuName: "",
  sort: 1,
  path: "",
  component: "",
  perms: "",
  status: 1,
});
let defaultModel = reactive({});
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
};
let getDetail = () => {
  console.log("详情");
  menuInfo(props.menuId).then((data) => {
    console.log(1, data);
  });
};

let changeParentIdHandle = (newParentId) => {
  model.parentId = newParentId;
};

let modelArr = computed(() => {
  return menuInputOp[model.menuType];
});

let formRef = ref(null);
let handleSubmit = (e) => {
  e.preventDefault();
  formRef.value?.validate((errs) => {
    console.log(1, errs);
    if (!errs) {
      window.$msg.success("成功");
    } else {
      window.$msg.error("失败");
    }
  });
};
let handleReset = () => {
  console.log(defaultModel, model);
};
</script>

<template>
  <y-modal v-model="dialogShow">
    <y-card title="新增菜单" @close="closeHandle">
      <div class="g-form__box">
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
          label-placement="left"
          require-mark-placement="left"
          label-width="80"
        >
          <n-form-item path="parentId" label="上级菜单">
            <n-tree-select
              :default-value="model.parentId"
              :options="options"
              @update:value="changeParentIdHandle"
              size="small"
            />
          </n-form-item>
          <n-form-item path="menuType" label="菜单类型">
            <y-radio v-model="model.menuType" :options="menuTypeOp"></y-radio>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('icon')"
            path="icon"
            label="菜单图标"
          >
            <IconSelect v-model="model.icon" />
          </n-form-item>
          <n-form-item path="menuName" label="菜单名称">
            <y-input v-model="model.menuName"></y-input>
          </n-form-item>
          <n-form-item path="sort" label="显示排序">
            <y-input-number v-model="model.sort" :min="1"></y-input-number>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('path')"
            path="path"
            label="路由地址"
          >
            <y-input v-model="model.path"></y-input>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('component')"
            path="component"
            label="组件路径"
          >
            <y-input v-model="model.component"></y-input>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('perms')"
            path="perms"
            label="权限字符"
          >
            <y-input v-model="model.perms"></y-input>
          </n-form-item>
          <n-form-item
            v-show="modelArr.includes('status')"
            path="status"
            label="菜单状态"
          >
            <y-radio v-model="model.status" :options="statusOp"></y-radio>
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <y-button type="success" @click="handleSubmit">提交</y-button>
        <y-button type="info" @click="handleReset">重置</y-button>
      </template>
    </y-card>
  </y-modal>
</template>

<style lang="scss" scoped></style>
