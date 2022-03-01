import request from "@/config/serve.js";

// 获取系统版本升级配置数据列表
export function getWhiteList(params) {
  return request("post", "/marketUpdate/config/list", params, false);
}
// 新增系统版本升级配置数据列表
export function addWhiteList(params) {
  return request("post", "/marketUpdate/config/save", params, false);
}
// 编辑系统版本升级配置数据列表
export function editWhiteList(params) {
  return request("post", "/marketUpdate/config/update", params, false);
}
// 下架系统版本升级配置数据列表
export function offlinetWhiteList(params) {
  return request("post", "/marketUpdate/config/offline", params, false);
}
// 上线系统版本升级配置数据列表
export function onlinetWhiteList(params) {
  return request("post", "/marketUpdate/config/online", params, false);
}
// 市场版本数据列表
export function getMarketList(params) {
  return request("post", "/market/manage/queryList", params, false);
}
// sdk版本数据列表
export function getSDKList(params) {
  return request("get", "/apiVersion/all", params, false);
}
// 国际化数据列表查询
export function getdescList(params) {
  return request("post", "/marketUpdate/desc/list", params, false);
}
// 国际化数据列表添加
export function addDescList(params) {
  return request("post", "/marketUpdate/desc/save", params, false);
}
// 国际化数据列表删除
export function deleteDescList(params) {
  return request("post", "/marketUpdate/desc/delete", params, false);
}
// 国际化数据列表编辑
export function editdescList(params) {
  return request("post", "/marketUpdate/desc/update", params, false);
}
