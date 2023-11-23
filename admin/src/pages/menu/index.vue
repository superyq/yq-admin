<script setup>
import { reactive, ref, onMounted, h } from "vue";
import { NButtonGroup } from "naive-ui";
import { getTable, delMenu } from "@/pages/menu/api/index.js";
import { toTreeData } from "@/utils/common.js";
import AddOrUpdate from "@/pages/menu/components/AddOrUpdate.vue";
import YButton from "@/components/naive-ui/y-button.vue";

onMounted(() => {
  getTablehandle();
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
    width: "200",
  },
  {
    title: "组件路径",
    key: "component",
    align: "center",
    width: "200",
  },
  {
    title: "状态",
    key: "status",
    align: "center",
    width: "120",
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
// const data = [
//   {
//     menuName: "系统管理",
//     icon: "system",
//     sort: 1,
//     perms: "",
//     component: "",
//     status: 1,
//     createTime: "2022-11-16 15:20:06",
//     menuType: "M",
//     menuId: 1,
//     parentId: 0,
//     children: [
//       {
//         menuName: "系统菜单",
//         icon: "tree-table",
//         sort: 1,
//         perms: "system:menu:list",
//         component: "system/menu/index",
//         status: 1,
//         createTime: "2022-11-16 15:20:06",
//         menuType: "C",
//         menuId: 102,
//         parentId: 1,
//         children: [
//           {
//             menuName: "菜单删除",
//             icon: "",
//             sort: 4,
//             perms: "system:menu:remove",
//             component: "",
//             status: 0,
//             createTime: "2022-11-16 15:20:06",
//             menuType: "F",
//             menuId: 1015,
//             parentId: 102,
//           },
//         ],
//       },
//       {
//         menuName: "系统字典",
//         icon: "education",
//         sort: 2,
//         perms: "",
//         component: "wordbook/index",
//         status: 1,
//         createTime: "2022-11-16 15:20:06",
//         menuType: "C",
//         menuId: 1093,
//         parentId: 1,
//       },
//     ],
//   },
//   {
//     menuName: "用户管理",
//     icon: "peoples",
//     sort: 5,
//     perms: "",
//     component: "",
//     status: 1,
//     createTime: "2022-11-16 15:20:06",
//     menuType: "M",
//     menuId: 1063,
//     parentId: 0,
//     children: [
//       {
//         menuName: "角色管理",
//         icon: "people",
//         sort: 5,
//         perms: "",
//         component: "user/role/index",
//         status: 1,
//         createTime: "2022-11-16 15:20:06",
//         menuType: "C",
//         menuId: 1067,
//         parentId: 1063,
//       },
//       {
//         menuName: "用户管理",
//         icon: "user",
//         sort: 1,
//         perms: "",
//         component: "user/user/index",
//         status: 1,
//         createTime: "2022-11-16 15:20:06",
//         menuType: "C",
//         menuId: 1064,
//         parentId: 1063,
//       },
//     ],
//   },
// ];
const getTablehandle = () => {
  loading.value = true;
  getTable({ ...searchForm, ...pages }).then((data) => {
    tableData = toTreeData(data, 0);
    parentIdOptions = [{ key: 0, label: "主类目", children: toOptions(tableData) }];
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
  console.log(1, row);
};
const addMenuHandle = (row) => {
  console.log(1, row);
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
        console.log(data);
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
let addHandle = () => {
  dialogShow.value = true;
};

let closeHandle = () => {
  dialogShow.value = false;
  menuId.value = null;
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
    </div>
    <div class="g-page">
      <y-page
        :pages="pages"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      ></y-page>
    </div>
    <AddOrUpdate :show="dialogShow" :menuId="menuId" :options="parentIdOptions" @close="closeHandle" />
  </div>
</template>

<style lang="scss" scoped></style>
