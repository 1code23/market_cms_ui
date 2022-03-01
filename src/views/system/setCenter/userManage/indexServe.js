import request from "@/config/serve.js";

// 查询Y
export function getUserList(params) {
  return request("post", "/honorManageUser/list", params);
}
//新增Y
export function addUser(data) {
  return request("post", "/honorManageUser/addUser", data);
}
//修改Y
export function updateUser(data) {
  return request("post", "/honorManageUser/editUser", data);
}
//删除Y
export function deleteUser(data) {
  return request("post", "/honorManageUser/deleteUser", data);
}
//重置密码
export function updatePassword(data) {
  return request("post", "/honorManageUser/editUser", data);
}

// 查询角色列表 Y
export function getRoleList(params) {
  return request("post", "/role/queryList", params);
}
