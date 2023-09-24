<script setup>
import { reactive, ref } from "vue";

let searchForm = reactive({
  menuName: "",
  menuStatue: null,
});
let options = [
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
let tableLoading = ref(false);
let dialogShow = ref(false);

let addHandle = () => {
  console.log("新增");
};
let searchHandle = () => {
  console.log("筛选");
};
let resetHandle = () => {
  console.log("重置");
};
const columns = [
  {
    title: "菜单名称",
    key: "menuName",
    align: "center",
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
</script>

<template>
  <div class="g-box">
    <div class="g-search-box">
      <y-input
        v-model="searchForm.menuName"
        placeholder="请输入目录名"
      ></y-input>
      <y-select
        v-model="searchForm.menuStatue"
        :options="options"
        placeholder="请选择目录状态"
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
      <y-table :columns="columns" :data="data" :row-key="rowKey"></y-table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
