/**
 *
 * @param list  需要树结构的数据
 * @param option
 *   option   {}包含顶级key id   父级key parentId  排序key (可选 默认id排序)
 * @returns
 */
function flat2nest(list, option = {}) {
  const { id = -1, parentId = "parentId", sortKey = "id" } = option;
  let res = list
    .filter(item => item[parentId] === id)
    .sort((a, b) => a[sortKey] - b[sortKey])
    .map(item => ({ ...item, children: flat2nest(list, { id: item.id }) }));

  return res;
}

let arrList = [
  {
    description: "",
    iconUrl: "",
    id: 25,
    name: "测试部门",
    parentId: -1,
    sort: 1,
    userId: ""
  },
  {
    description: "",
    iconUrl: "",
    id: 13,
    name: "武器装备组1",
    parentId: 12,
    sort: 1,
    userId: "10089"
  },
  {
    description: "",
    iconUrl: "",
    id: 10,
    name: "科研部门",
    parentId: -1,
    sort: 2,
    userId: "10159,10172"
  },
  {
    description: "",
    iconUrl: "",
    id: 11,
    name: "科研小组1",
    parentId: 10,
    sort: 1,
    userId: "10159"
  },
  {
    description: "",
    iconUrl: "",
    id: 12,
    name: "科研小组2",
    parentId: 10,
    sort: 2,
    userId: "10089"
  },
  {
    description: "",
    iconUrl: "",
    id: 14,
    name: "武器装备组2",
    parentId: 12,
    sort: 2,
    userId: "10089"
  },
  {
    description: "liujf测试",
    iconUrl: "",
    id: 16,
    name: "调研小组",
    parentId: 18,
    sort: 1,
    userId: "10097,10095"
  },
  {
    description: "",
    iconUrl: "",
    id: 15,
    name: "后勤部门",
    parentId: -1,
    sort: 3,
    userId: "10095"
  },
  {
    description: "",
    iconUrl: "",
    id: 17,
    name: "审核小组",
    parentId: -1,
    sort: 4,
    userId: "10099"
  },
  {
    description: "",
    iconUrl: "",
    id: 18,
    name: "调研大组",
    parentId: -1,
    sort: 5,
    userId: "10095"
  },
  {
    description: "",
    iconUrl: "",
    id: 27,
    name: "测试",
    parentId: 26,
    sort: 1,
    userId: ""
  },
  {
    description: "",
    iconUrl: "",
    id: 26,
    name: "测试小组",
    parentId: 25,
    sort: 1,
    userId: ""
  }
];

let res = flat2nest(arrList);
console.log(res);
