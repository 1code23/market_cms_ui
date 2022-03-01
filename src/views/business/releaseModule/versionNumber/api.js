import request from "@/config/serve.js";

// 获取系统版本号数据列表
export function getWhiteList(params) {
  return request("post", "/marketUpdate/apiVersion/list", params, false);
}
// 新增系统版本号数据列表
export function addWhiteList(params) {
  return request("post", "/marketUpdate/apiVersion/save", params, false);
}
// 编辑系统版本号数据列表
export function editWhiteList(params) {
  return request("post", "/marketUpdate/apiVersion/update", params, false);
}
// 下架系统版本号数据列表
export function offlinetWhiteList(params) {
  return request("post", "/marketUpdate/apiVersion/offline", params, false);
}
// 上线系统版本号数据列表
export function onlinetWhiteList(params) {
  return request("post", "/marketUpdate/apiVersion/online", params, false);
}
