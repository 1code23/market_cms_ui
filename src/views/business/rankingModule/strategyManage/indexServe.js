import request from "@/config/serve.js";

// 查询
export function getStrategyList(params) {
  return request("post", "/list/queryRankList", params);
}
//新增
export function addStrategyList(data) {
  return request("post", "/list/insertRank", data);
}
//修改
export function updateStrategyList(data) {
  return request("post", "/list/updateRank", data);
}
//上线&下线
export function changeStatus(data) {
  return request("post", "/list/updateRankByRankId", data);
}
