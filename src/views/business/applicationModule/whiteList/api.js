import request from "@/config/serve.js";

// 获取应用白名单数据列表
export function getWhiteList(params) {
  return request("post", "/whiteapp/queryList", params, false);
}
// 删除应用白名单数据列表
export function deleteWhiteList(params) {
  return request("get", "/whiteapp/delete", params, false);
}
// 新增应用白名单数据列表
export function addWhiteList(params) {
  return request("post", "/whiteapp/insert", params, false);
}
// 编辑应用白名单数据列表
export function editWhiteList(params) {
  return request("post", "/whiteapp/update", params, false);
}
