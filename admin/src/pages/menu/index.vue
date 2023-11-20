<script setup>
import { reactive, ref, onMounted } from "vue";
import { getTable } from "@/pages/menu/api/index.js";

let searchForm = reactive({
  menuName: "",
  menuState: null,
});
let pages = reactive({
  total: 100,
  current: 1,
  pageSize: 20,
});
let stateOptions = [
  {
    label: "启动",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
];
let tableData = reactive([]);
let loading = ref(false);
let dialogShow = ref(false);

onMounted(() => {
  getTablehandle();
});

const getTablehandle = () => {
  loading.value = true;
  getTable({ ...searchForm, ...pages }).then((_data) => {
    console.log(1, _data);
    tableData = data;
    loading.value = false;
  });
};

let addHandle = () => {
  console.log("新增");
};
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
const columns = [
  {
    title: "菜单名称",
    key: "menuName",
    align: "center",
    width: "200",
  },
  {
    title: "图标",
    key: "icon",
    align: "center",
  },
  {
    title: "排序",
    key: "sort",
    align: "center",
    width: "80"
  },
  {
    title: "权限标识",
    key: "perms",
    align: "center",
  },
  {
    title: "组件路径",
    key: "component",
    align: "center",
  },
  {
    title: "状态",
    key: "status",
    align: "center",
  },
  {
    title: "创建时间",
    key: "createTime",
    align: "center",
    width: "200",
  },
  {
    title: "操作",
    keys: "actions",
    align: "center",
  },
];
const data = [
  {
    menuName: "系统管理",
    icon: "system",
    sort: 1,
    perms: "",
    component: "",
    status: 1,
    createTime: "2022-11-16 15:20:06",
    menuType: "M",
    menuId: 1,
    parentId: 0,
    children: [
      {
        menuName: "系统菜单",
        icon: "tree-table",
        sort: 1,
        perms: "system:menu:list",
        component: "system/menu/index",
        status: 1,
        createTime: "2022-11-16 15:20:06",
        menuType: "C",
        menuId: 102,
        parentId: 1,
        children: [
          {
            menuName: "菜单删除",
            icon: "",
            sort: 4,
            perms: "system:menu:remove",
            component: "",
            status: 0,
            createTime: "2022-11-16 15:20:06",
            menuType: "F",
            menuId: 1015,
            parentId: 102,
          },
        ],
      },
      {
        menuName: "系统字典",
        icon: "education",
        sort: 2,
        perms: "",
        component: "wordbook/index",
        status: 1,
        createTime: "2022-11-16 15:20:06",
        menuType: "C",
        menuId: 1093,
        parentId: 1,
      },
    ],
  },
  {
    menuName: "用户管理",
    icon: "peoples",
    sort: 5,
    perms: "",
    component: "",
    status: 1,
    createTime: "2022-11-16 15:20:06",
    menuType: "M",
    menuId: 1063,
    parentId: 0,
    children: [
      {
        menuName: "角色管理",
        icon: "people",
        sort: 5,
        perms: "",
        component: "user/role/index",
        status: 1,
        createTime: "2022-11-16 15:20:06",
        menuType: "C",
        menuId: 1067,
        parentId: 1063,
      },
      {
        menuName: "用户管理",
        icon: "user",
        sort: 1,
        perms: "",
        component: "user/user/index",
        status: 1,
        createTime: "2022-11-16 15:20:06",
        menuType: "C",
        menuId: 1064,
        parentId: 1063,
      },
    ],
  },
];
let rowKey = (row) => {
  return row.menuId;
};
let pageChange = (page) => {
  pages.current = page;
  getTablehandle();
} 
let pageSizeChange = (pageSize) => {
  pages.current = 1;
  pages.pageSize = pageSize;
  getTablehandle();
} 
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
        :options="stateOptions"
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
      <y-page :pages="pages" @pageChange="pageChange" @pageSizeChange="pageSizeChange"></y-page>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
