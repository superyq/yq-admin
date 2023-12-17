<script setup>
import { reactive, ref, onMounted, h } from "vue";
import { NButtonGroup, NSwitch } from "naive-ui";
import { getTable, delMenu, changeStatus } from "@/pages/dictenum/api/index.js";
import AddOrUpdate from "@/pages/dictenum/components/AddOrUpdate.vue";
import YButton from "@/components/naive-ui/y-button.vue";

onMounted(() => {
  getTablehandle();
});

let loading = ref(false);
let tableData = reactive([]);
let searchForm = reactive({
  demo: "",
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
    console.log(1, data);
    tableData = data;
    loading.value = false;
  });
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
    title: "字典编码",
    key: "dictCode",
    align: "center",
  },
  {
    title: "字典标签",
    key: "dictLabel",
    align: "center",
  },
  {
    title: "字典键值",
    key: "dictValue",
    align: "center",
  },
  {
    title: "字典排序",
    key: "sort",
    align: "center",
  },
  {
    title: "状态",
    key: "status",
    align: "center",
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
    width: "180",
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
              icon: "delete",
              type: "error",
              onClick: () => deleteHandle(row),
            },
            {
              default: () => "删除",
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
  console.log(row);
  dialogShow.value = true;
  formId.value = row.dictCode;
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
</script>

<template>
  <div class="g-box">
    <div class="g-control-box">
      <div class="g-control__add">
        <y-button @click="addHandle" icon="add" type="info">新增</y-button>
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
