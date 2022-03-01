export const MAXSIZE = 3000; //后端接口每个page最大size
export const USERINFO = "droi.market.userInfo"; // 存储在localStorage里用户信息的key
export const LASTTIME = "droi.market.lastTIme"; // 存储在localStorage里最后一次点击的时间的key
export const POWERTREE = "droi.market.powerTree";
export const TIMEOUT = 2 * 60 * 60 * 1000; //超时时间2h

export const booleanList = [
  { key: 1, value: "是" },
  { key: 0, value: "否" },
];
// 启用状态
export const enabledStatusList = [
  { key: 1, value: "使用中", tag: "success" },
  { key: -1, value: "已禁用", tag: "danger" },
  { key: 0, value: "已禁用", tag: "danger" },
  { key: 2, value: "已禁用", tag: "danger" },
];
// 根据是否删除来确认启用状态
export const deleteStatusList = [
  { key: 0, value: "使用中", tag: "success" },
  { key: 1, value: "已禁用", tag: "danger" },
];
export const assemblyTypeList = [
  {
    key: 0,
    value: "图片",
    sub: [
      { key: 0, value: "Banner" },
      { key: 1, value: "KV图" },
      { key: 2, value: "横向大图" },
      { key: 3, value: "纵向大图" },
      { key: 4, value: "纵向图片合集" },
      { key: 5, value: "图文卡片" },
    ],
  },
  {
    key: 1,
    value: "视频",
    sub: [
      { key: 6, value: "横向视频合集" },
      { key: 7, value: "纵向视频合集" },
    ],
  },
  {
    key: 2,
    value: "列表",
    sub: [
      { key: 8, value: "横向滑动" },
      { key: 9, value: "纵向列表" },
    ],
  },
];

// 应用类型
export const appTypeList = [
  { key: 2, value: "应用" },
  { key: 1, value: "游戏" },
];

// 应用子类型
export const appSubTypeList = [
  { key: 1, value: "休闲游戏" },
  { key: 2, value: "网络游戏" },
];
// 应用来源
export const sourceList = [
  { key: 0, value: "开发者平台" },
  { key: 1, value: "管理运营平台" },
];
// 上架类型
export const releaseTypeList = [
  { key: 1, value: "普通" },
  { key: 2, value: "预约" },
  { key: 3, value: "内测" },
  { key: 4, value: "首发" },
];
// 机型管理数据列表中的操作类型
export const operateStartus = [
  { key: 0, value: "禁用", class: "colorGreen" },
  { key: 1, value: "恢复", class: "colorRed" },
];
// 上线状态
export const onlineStartus = [
  { key: 0, value: "已下线", class: "colorRed" },
  { key: 1, value: "已上线", class: "colorGreen" },
];
// 应用状态
export const appStatusList = [
  { key: 1001, value: "未上架", tag: "" },
  { key: 1002, value: "待上架", tag: "info" },
  { key: 1003, value: "已上架", tag: "success" },
  { key: 1004, value: "管理员下架", tag: "warning" },
  { key: 1005, value: "开发者下架", tag: "danger" },
];
// 榜单类型
export const rankingTypeList = [
  { key: "oz_data_rank_list_synthesis_day", value: "综合榜" },
  { key: "oz_data_rank_list_download_day", value: "下载榜" },
  { key: "oz_data_rank_list_soar_hourly", value: "飙升榜" },
  { key: "oz_data_rank_list_search_day", value: "热搜榜" },
];
// 页面类型
export const pageTypeList = [
  { key: 0, value: "普通页面" },
  { key: 1, value: "分类" },
  { key: 2, value: "个人中心" },
  { key: 5, value: "首页" },
  { key: 6, value: "游戏页" },
  { key: 7, value: "应用页" },
  { key: 8, value: "榜单" },
  // { key: 9, value: "外部页面" },
];
// 页面等级
export const pageDeepList = [
  { key: 1, value: "一级页面" },
  { key: 2, value: "二级页面" },
  { key: 3, value: "三级页面" },
];
export const wishStatus = [
  { key: 0, value: "待关联" },
  { key: 1, value: "已上线" },
  { key: 2, value: "已下线" },
];
// 更新范围
export const updateStatus = [
  { key: 1, value: "强制更新" },
  { key: 2, value: "提示更新" },
  // { key: 3, value: "不更新" },
  { key: 4, value: "后台更新" },
];
//组件样式列表，因为后端没有size，所以要根据前端数据去匹配---swx
export const asseblyStyleArr = [
  {
    styleName: "Banner—圆点切换",
    assemblyStyle: 1,
    size: "1248*535",
    px: "233*100",
  },
  {
    styleName: "KV",
    assemblyStyle: 2,
    size: "160*160",
    px: "100*100",
  },
  {
    styleName: "纵向列表",
    assemblyStyle: 10,
  },
  {
    styleName: "横向滑动",
    assemblyStyle: 11,
  },
  {
    styleName: "纵向图片合集",
    assemblyStyle: 38,
    size: "608*810",
    px: "100*133",
  },
  {
    styleName: "纵向视频合集",
    assemblyStyle: 60,
    size: "608*810",
    px: "100*133",
  },
  {
    styleName: "横向大图",
    assemblyStyle: 64,
    size: "1248*702",
    px: "178*100",
  },
  {
    styleName: "横向视频合集",
    assemblyStyle: 67,
    size: "1248*702",
    px: "178*100",
  },
  {
    styleName: "横向图片合集",
    assemblyStyle: 68,
    size: "1248*702",
    px: "178*100",
  },
  {
    styleName: "图文卡片",
    assemblyStyle: 69,
    size: "1248*702",
    px: "178*100",
  },
  {
    styleName: "纵向大图",
    assemblyStyle: 71,
    size: "1248*1664",
    px: "100*133",
  },
];
