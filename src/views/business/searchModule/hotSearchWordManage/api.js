import request from "@/config/serve.js";
// 获取机型数据
export function getmodelData(params) {
  return request("post", "/Cms/queryDeviceList", params, false);
}
// 获取滚动词列表数据
export function getScrollWordData(params) {
  return request("post", "/Oz/querySearchWordConfList", params, false);
}
// 新增滚动词列表数据
export function addScrollWordData(params) {
  return request("post", "/Oz/createSearchWordConf", params, false);
}
// 修改滚动词列表数据状态
export function amendModelData(params) {
  return request("get", "/Oz/updateSearchWordConfStatus", params, false);
}
// 编辑滚动词列表数据
export function updateDevice(params) {
  return request("post", "/Oz/updateSearchWordConf", params, false);
}
// 批量配置滚动词
export function allocationScrollWorld(params) {
  return request("post", "/Oz/createDetailList", params, false);
}
// 批量查询滚动词
export function getScrollWorld(params) {
  return request("get", "/Oz/detailListByParentId", params, false);
}
// 滚动词国际化列表查询
export function getInternationalizationList(params) {
  return request("post", "/Oz/detailDescListByParentId", params, false);
}
// 添加滚动词国际化列表
export function addInternationalizationList(params) {
  return request("post", "/Oz/addDesclList", params, false);
}
// 删除滚动词国际化列表
export function deleteInternationalizationList(params) {
  return request("get", "/Oz/deleteDetailDescByLanguage", params, false);
}
// 编辑滚动词国际化列表
export function editInternationalizationList(params) {
  return request("post", "/Oz/updateWordConfDetailDesclList", params, false);
}
// 编辑滚动词国际化列表
export function detailInternationalizationList(params) {
  return request("get", "/Oz/detailDescByIds", params, false);
}
// 编辑国际化列表详情
export function editDetailInternationalizationList(params) {
  return request("get", "/Oz/selectdetailDescByIds", params, false);
}
