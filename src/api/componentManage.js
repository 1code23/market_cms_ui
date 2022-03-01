import request from "@/config/serve.js";

// api-组件管理
export function queryAssemblyList(data) {
  return request("post", "/assembly/queryAssemblyList", data);
}
export function updateAssembly(data) {
  return request("post", "/assembly/updateAssembly", data);
}
export function insertAssembly(data) {
  return request("post", "/assembly/insertAssembly", data);
}
export function queryAssemblyDescList(data) {
  return request("post", "/assembly/queryAssemblyDescList", data);
}
export function insertAssemblyDesc(data) {
  return request("post", "/assembly/insertAssemblyDesc", data);
}
export function updateAssemblyDesc(data) {
  return request("post", "/assembly/updateAssemblyDesc", data);
}
export function deleteAssemblyDesc(data) {
  return request("post", "/assembly/deleteAssemblyDesc", data);
}
export function queryAssemblyApkList(data) {
  return request("post", "/assembly/queryAssemblyApkList", data);
}
export function queryAssemblyTypeList(data) {
  return request("post", "/assembly/queryAssemblyTypeList", data);
}
export function queryAssemblyStyleList(data) {
  return request("post", "/assembly/queryAssemblyStyleList", data);
}
export function queryApkLabelList(data) {
  return request("post", "/assembly/queryApkLabelList", data);
}
export function queryApkCategoryList(data) {
  return request("post", "/assembly/queryApkCategoryList", data);
}
export function queryLanguageList(data) {
  return request("post", "/assembly/queryLanguageList", data);
}
export function insertApkList(data) {
  return request("post", "/assembly/insertApkList", data);
}
export function queryApkListByAssemblyId(data) {
  return request("post", "/assembly/queryApkListByAssemblyId", data);
}
export function queryAssemblyPageList(data) {
  return request("post", "/assembly/queryAssemblyPageList", data);
}
export function queryAssemblyDetail(data) {
  return request("post", "/assembly/queryAssemblyDetail", data);
}
// 查询市场部署的页面
export function getMarketDeployList(params) {
  return request("post", "/cmsPage/queryList", params);
}
export function getMarketList(params) {
  return request("post", "/market/manage/queryList", params);
}
