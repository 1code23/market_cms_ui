import request from "@/config/serve.js";

// 获取系统版本升级请求配置数据列表
export function getWhiteList(params) {
  return request("post", "/marketUpdate/self/list", params, false);
}
// 新增系统版本升级请求配置数据列表
export function addWhiteList(params) {
  return request("post", "/marketUpdate/self/save", params, false);
}
// 编辑系统版本升级请求配置数据列表
export function editWhiteList(params) {
  return request("post", "/marketUpdate/self/update", params, false);
}
// 下架系统版本升级请求配置数据列表
export function offlinetWhiteList(params) {
  return request("post", "/marketUpdate/self/offline", params, false);
}
// 上线系统版本升级请求配置数据列表
export function onlinetWhiteList(params) {
  return request("post", "/marketUpdate/self/online", params, false);
}
