import request from "@/config/serve.js";

// 查询
export function getLogList(params) {
  return request("post", "/userOperationLog/getUserOperationLog", params);
}
// 查看数据
export function queryDateById(params) {
  return request("post", "/userOperationLog/queryDateById", params);
}
