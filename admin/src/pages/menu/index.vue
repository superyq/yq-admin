<script setup>
import { reactive, ref, onMounted, h } from "vue";
import { NButtonGroup, NSwitch } from "naive-ui";
import { getTable, delMenu, changeStatus } from "@/pages/menu/api/index.js";
import { toTreeData } from "@/utils/common.js";
import { statusOp } from "@/pages/menu/options/index.js";
import AddOrUpdate from "@/pages/menu/components/AddOrUpdate.vue";
import YButton from "@/components/naive-ui/y-button.vue";

onMounted(() => {
  getTablehandle();
});

let searchForm = reactive({
  menuName: "",
  menuState: null,
});
let pages = reactive({
  total: 100,
  current: 1,
  pageSize: 20,
});
let searchHandle = () => {
  pages.current = 1;
  getTablehandle();
};
let resetHandle = () => {
  pages.current = 1;
  searchForm.menuName = "";
  searchForm.menuState = null;
  getTablehandle();
};
let pageChange = (page) => {
  pages.current = page;
  getTablehandle();
};
let pageSizeChange = (pageSize) => {
  pages.current = 1;
  pages.pageSize = pageSize;
  getTablehandle();
};

let tableData = reactive([]);
let parentIdOptions = reactive([]);
let loading = ref(false);
let rowKey = (row) => {
  return row.menuId;
};
const columns = [
  {
    title: "菜单名称",
    key: "menuName",
    align: "center",
    width: "200",
    fixed: "left"
  },
  {
    title: "图标",
    key: "icon",
    align: "center",
    width: "120",
  },
  {
    title: "排序",
    key: "sort",
    align: "center",
    width: "80",
  },
  {
    title: "权限标识",
    key: "perms",
    align: "center",
    minWidth: "200",
  },
  {
    title: "组件路径",
    key: "component",
    align: "center",
    width: "200",
  },
  {
    title: "创建时间",
    key: "createTime",
    align: "center",
    width: "200",
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
    width: "240",
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
              icon: "add",
              type: "info",
              onClick: () => addMenuHandle(row),
            },
            {
              default: () => "新增",
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
let handleUpdateValue = (v, row) => {
  changeStatus(row.menuId, v).then((data) => {
    window.$msg.success(data);
  });
};

const getTablehandle = () => {
  loading.value = true;
  getTable({ ...searchForm, ...pages }).then((data) => {
    tableData = toTreeData(data, 0);
    parentIdOptions = [
      { key: 0, label: "主类目", children: toOptions(tableData) },
    ];
    loading.value = false;
  });
};
function toOptions(arr) {
  let _arr = [];
  arr.forEach((item) => {
    if (item.children) {
      _arr.push({
        label: item.menuName,
        key: item.menuId,
        children: toOptions(item.children),
      });
    } else {
      _arr.push({ label: item.menuName, key: item.menuId });
    }
  });
  return _arr;
}
const editHandle = (row) => {
  menuId.value = row.menuId;
  dialogShow.value = true;
};
const addMenuHandle = (row) => {
  parentId.value = row.menuId;
  dialogShow.value = true;
};
const deleteHandle = (row) => {
  const { menuName, menuId } = row;
  window.$dialog.warning({
    title: "警告",
    content: `确定删除 '${menuName}'？`,
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      delMenu(menuId).then((data) => {
        window.$msg.success("删除成功");
      });
    },
    onNegativeClick: () => {
      window.$msg.info("取消删除");
    },
  });
};

let dialogShow = ref(false);
let menuId = ref(null);
let parentId = ref(0);
let addHandle = () => {
  dialogShow.value = true;
};

let closeHandle = () => {
  dialogShow.value = false;
  menuId.value = null;
  parentId.value = 0;
};
</script>

<template>
  <div class="g-box">
    <div class="g-search-box">
      <y-input
        v-model="searchForm.menuName"
        placeholder="请输入菜单名"
        @keyup.enter="searchHandle"
      ></y-input>
      <y-select
        v-model="searchForm.menuState"
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
    <AddOrUpdate
      :show="dialogShow"
      :menuId="menuId"
      :parentId="parentId"
      :options="parentIdOptions"
      @close="closeHandle"
    />
  </div>
</template>

<style lang="scss" scoped></style>
