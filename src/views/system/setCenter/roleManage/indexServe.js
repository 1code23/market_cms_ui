import request from "@/config/serve.js";

// 查询角色列表 Y
export function getRoleList(params) {
  return request("post", "/role/queryList", params);
}
//新增 Y
export function addRole(data) {
  return request("post", "/role/addRole", data);
}
//修改 Y
export function updateRole(data) {
  return request("post", "/role/updateRole", data);
}
//删除  Y
export function deleteRole(data) {
  return request("get", "/role/deleteRole", data);
}
// 查询所有菜单
export function getAllMenuList(params) {
  return request("get", "/role/getMenuTreeBy", params);
}

// 成员管理
export function getUserListByRoleId(params) {
  return request("get", "/role/getUserListByRoleId", params);
}

// 成员管理 删除该角色下成员
export function delegeRolePeople(params) {
  return request("get", "/role/delUserRole", params);
}
