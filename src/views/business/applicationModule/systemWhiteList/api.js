import request from "@/config/serve.js";

// 获取系统应用白名单数据列表
export function getWhiteList(params) {
  return request("post", "/oswhiteapp/queryList", params, false);
}
// 删除系统应用白名单数据列表
export function deleteWhiteList(params) {
  return request("get", "/oswhiteapp/delete", params, false);
}
// 新增系统应用白名单数据列表
export function addWhiteList(params) {
  return request("post", "/oswhiteapp/insert", params, false);
}
// 编辑系统应用白名单数据列表
export function editWhiteList(params) {
  return request("post", "/oswhiteapp/update", params, false);
}
