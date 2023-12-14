<script setup>
import { reactive, ref, onMounted, h } from "vue";
import { NButtonGroup, NSwitch } from "naive-ui";
import { getTable, delDict, changeStatus } from "@/pages/dict/api/index.js";
import { statusOp } from "@/options/index.js";
import AddOrUpdate from "@/pages/dict/components/AddOrUpdate.vue";
import YButton from "@/components/naive-ui/y-button.vue";
import router from "@/router/index.js";

onMounted(() => {
  getTablehandle();
});

let loading = ref(false);
let tableData = reactive([]);
let searchForm = reactive({
  dictName: "",
  dictStatus: null,
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
  searchForm.dictName = "";
  searchForm.dictStatus = null;
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
  return row.dictId;
};
const columns = [
  {
    title: '字典ID',
    key: 'dictId',
    align: 'center',
    width: '80'
  },
  {
    title: "字典名称",
    key: "dictName",
    align: "center",
    width: "160",
    fixed: "left",
  },
  {
    title: "字典类型",
    key: "dictType",
    align: "center",
    width: "160",
    render(row) {
      return h('div', {
        style: 'cursor: pointer;color: red',
        onClick: () => routerChange(row)
      }, {
        default: () => row.dictType
      })
    }
  },
  {
    title: "备注",
    key: "remark",
    align: "center",
    minWidth: '120'
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
    width: "200",
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
  changeStatus(row.dictId, v).then((data) => {
    window.$msg.success(data);
  });
};
const routerChange = (row) => {
  router.push(`/dictenum/${row.id}`)
}
const editHandle = (row) => {
  formId.value = row.dictId;
  dialogShow.value = true;
};
const deleteHandle = (row) => {
  const { dictName, dictId } = row;
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 '${dictName}'？`,
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      delDict(dictId).then((data) => {
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
    <div class="g-search-box">
      <y-input
        v-model="searchForm.dictName"
        placeholder="请输入字典名"
        @keyup.enter="searchHandle"
      ></y-input>
      <y-select
        v-model="searchForm.dictStatus"
        :options="statusOp"
        placeholder="请选择字典状态"
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
    <AddOrUpdate
      :show="dialogShow"
      :formId="formId"
      @close="closeHandle"
    />
  </div>
</template>

<style lang="scss" scoped></style>
