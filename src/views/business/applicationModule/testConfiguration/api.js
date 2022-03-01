import request from "@/config/serve.js";

// 获取应用数据列表
export function getWhiteList(params) {
  return request("post", "/adconfig/queryList", params, false);
}
// 新增应用白名单数据列表
export function addWhiteList(params) {
  return request("post", "/adconfig/insert", params, false);
}
// 编辑应用白名单数据列表
export function editWhiteList(params) {
  return request("post", "/adconfig/update", params, false);
}
