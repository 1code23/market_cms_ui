import request from "@/config/serve.js";

// 查询
export function getHomeList(params) {
  return request("post", "/home/queryList", params);
}
//新增
export function addHomeConfig(data) {
  return request("post", "/home/insert", data);
}
//修改
export function updateHomeConfig(data) {
  return request("post", "/home/update", data);
}
