<script setup>
import { reactive, ref, onMounted, h } from "vue";
import { NButtonGroup, NSwitch } from "naive-ui";
import { getTable, delMenu, changeStatus } from "@/pages/user/api/index.js";
import { statusOp } from "@/options/index.js";
import AddOrUpdate from "@/pages/user/components/AddOrUpdate.vue";
import YButton from "@/components/naive-ui/y-button.vue";

onMounted(() => {
  getTablehandle();
});

let loading = ref(false);
let tableData = reactive([]);
let searchForm = reactive({
  userName: "",
  realName: "",
  status: null,
});
let pages = reactive({
  total: 100,
  current: 1,
  pageSize: 20,
});
const getTablehandle = () => {
  loading.value = true;
  getTable({ ...searchForm, ...pages }).then((data) => {
    tableData = data;
    loading.value = false;
  });
};
const searchHandle = () => {
  pages.current = 1;
  getTablehandle();
};
const resetHandle = () => {
  pages.current = 1;
  searchForm.realName = "";
  searchForm.userName = "";
  searchForm.status = null;
  getTablehandle();
};
const pageChange = (page) => {
  pages.current = page;
  getTablehandle();
};
const pageSizeChange = (pageSize) => {
  pages.current = 1;
  pages.pageSize = pageSize;
  getTablehandle();
};

let dialogShow = ref(false);
let formId = ref(null);
let addHandle = () => {
  dialogShow.value = true;
};
let closeHandle = () => {
  dialogShow.value = false;
  formId.value = null;
};

const rowKey = (row) => {
  return row.demoId;
};
const columns = [
  {
    title: "用户ID",
    key: "userId",
    align: "center",
    width: "80",
    fixed: 'left'
  },
  {
    title: "账号",
    key: "userName",
    align: "center",
    width: "200",
  },
  {
    title: "真实姓名",
    key: "realName",
    align: "center",
    width: "200",
  },
  {
    title: "创建时间",
    key: "createTime",
    align: "center",
    minWidth: "200",
  },
  {
    title: "用户描述",
    key: "remark",
    align: "center",
  },
  {
    title: "状态",
    key: "status",
    align: "center",
    width: "120",
    fixed: "right",
    render(row) {
      return h(
        NSwitch,
        {
          defaultValue: row.status,
          checkedValue: 1,
          uncheckedValue: 0,
          onUpdateValue: (v) => handleUpdateValue(v, row),
        },
        null
      );
    },
  },
  {
    title: "操作",
    keys: "actions",
    align: "center",
    width: "340",
    fixed: "right",
    render(row) {
      return h(NButtonGroup, { size: "small" }, () => {
        return [
          h(
            YButton,
            {
              icon: "edit",
              type: "success",
              onClick: () => editHandle(row),
            },
            {
              default: () => "编辑",
            }
          ),
          h(
            YButton,
            {
              type: "info",
              onClick: () => editHandle(row),
            },
            {
              default: () => "分配角色",
            }
          ),
          h(
            YButton,
            {
              icon: "delete",
              type: "error",
              onClick: () => deleteHandle(row),
            },
            {
              default: () => "删除",
            }
          ),
          h(
            YButton,
            {
              type: "",
              onClick: () => resetPasswordHandle(row),
            },
            {
              default: () => "重置密码",
            }
          ),
        ];
      });
    },
  },
];
const handleUpdateValue = (v, row) => {
  changeStatus(row.demoId, v).then((data) => {
    window.$msg.success(data);
  });
};
const editHandle = (row) => {
  formId.value = row.userId;
  dialogShow.value = true;
};
const deleteHandle = (row) => {
  const { demoName, demoId } = row;
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 '${demoName}'？`,
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      delMenu(demoId).then((data) => {
        window.$msg.success("删除成功");
      });
    },
    onNegativeClick: () => {
      window.$msg.info("取消删除");
    },
  });
};
const resetPasswordHandle = (row) => {
  const { userName, userId } = row;
  window.$dialog.warning({
    title: "重置密码",
    content: `确定重置'${userName}'的密码为 888888？`,
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      delMenu(userId).then((data) => {
        window.$msg.success("重置成功");
      });
    },
    onNegativeClick: () => {
      window.$msg.info("取消重置");
    },
  });
};
</script>

<template>
  <div class="g-box">
    <div class="g-search-box">
      <y-input
        v-model="searchForm.userName"
        placeholder="请输入账号"
        @keyup.enter="searchHandle"
      ></y-input>
      <y-input
        v-model="searchForm.realName"
        placeholder="请输入真实姓名"
        @keyup.enter="searchHandle"
      ></y-input>
      <y-select
        v-model="searchForm.status"
        :options="statusOp"
        placeholder="请选择菜单状态"
        @update:modelValue="searchHandle"
      ></y-select>
    </div>
    <div class="g-control-box">
      <div class="g-control__add">
        <y-button @click="addHandle" icon="add" type="info">新增</y-button>
      </div>
      <div class="g-control__search">
        <y-button @click="searchHandle" icon="search" type="info"
          >筛选</y-button
        >
        <y-button @click="resetHandle" icon="reset">重置</y-button>
      </div>
    </div>
    <div class="g-table">
      <y-table
        :columns="columns"
        :data="tableData"
        :row-key="rowKey"
        :loading="loading"
      ></y-table>
    </div>
    <div class="g-page">
      <y-page
        :pages="pages"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      ></y-page>
    </div>
    <AddOrUpdate :show="dialogShow" :formId="formId" @close="closeHandle" />
  </div>
</template>

<style lang="scss" scoped></style>
