export const menuTypeOp = [
  {
    label: "目录",
    value: "M",
  },
  {
    label: "菜单",
    value: "C",
  },
  {
    label: "按钮",
    value: "F",
  },
];

export const menuInputOp = {
  M: ['icon','path', 'status'],
  C: ['icon','path', 'component', 'status', 'perms'],
  F: ['perms']
}

export const statusOp = [
  {
    label: '启用',
    value: 1
  }, {
    label: '禁用',
    value: 0
  }
]