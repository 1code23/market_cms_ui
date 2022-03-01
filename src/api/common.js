import request from "@/config/serve.js";

//api-所有语言查询
export function getLanguageList(params) {
  return request("get", "/language/all", params);
}
//api-应用--组件管理
export function selectApplyList(params) {
  return request("post", "/assembly/queryAssemblyApkList", params);
}
//api-页面--组件管理
export function queryPageList(params) {
  return request("post", "/assembly/queryPageList", params);
}
//api-机型，型号，手机型号
export function queryDeviceList(params) {
  return request("post", "/Cms/queryDeviceList", params);
}
//api-系统版本号
export function queryVersionList(params) {
  return request("post", "/market/manage/queryList", params);
}
//api-查询所有版本
export function getApiVersionList(params) {
  return request("get", "/apiVersion/all", params);
}
// api - 查询所有组件样式;
export function queryAssemblyStyleList(data) {
  return request("post", "/assembly/queryAssemblyStyleList", data);
}
