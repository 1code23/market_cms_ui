import request from "@/config/serve.js";

// 获取白名单数据列表
export function getWhiteList(params) {
  return request("post", "/marketUpdate/whitelist/list", params, false);
}
// 新增应用白名单数据列表
export function addWhiteList(params) {
  return request("post", "/marketUpdate/whitelist/save", params, false);
}
// 编辑应用白名单数据列表
export function editWhiteList(params) {
  return request("post", "/marketUpdate/whitelist/update", params, false);
}
// 下架白名单数据列表
export function offlinetWhiteList(params) {
  return request("post", "/marketUpdate/whitelist/offline", params, false);
}
// 上线白名单数据列表
export function onlinetWhiteList(params) {
  return request("post", "/marketUpdate/whitelist/online", params, false);
}
