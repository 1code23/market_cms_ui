import request from "@/config/serve.js";

// api-黑名单管理
export function queryApkBlackList(data) {
  return request("post", "/black/queryApkBlackList", data);
}
export function queryUserBlackList(data) {
  return request("post", "/black/queryUserBlackList", data);
}
export function insertApkBlack(data) {
  return request("post", "/black/insertApkBlack", data);
}
export function updateApkBlackById(data) {
  return request("post", "/black/updateApkBlackById", data);
}
export function updateStatusById(data) {
  return request("post", "/black/updateStatusById", data);
}
export function insertUserBlack(data) {
  return request("post", "/black/insertUserBlack", data);
}
export function queryUserList(data) {
  return request("post", "/black/queryUserList", data);
}
export function updateUserBlackById(data) {
  return request("post", "/black/updateUserBlackById", data);
}
export function deleteUserBlackById(data) {
  return request("post", "/black/deleteUserBlackById", data);
}
