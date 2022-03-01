import request from "@/config/serve.js";
import { MAXSIZE } from "@/common/constant/constant.js";

// 查询
export function getRankingInterveneList(params) {
  return request("post", "/list/queryRankDetailList", params);
}
//新增
export function addRankingIntervene(data) {
  return request("post", "/list/insertRankDetail", data);
}
//修改
export function updateRankingIntervene(data) {
  return request("post", "/list/updateRankDetail", data);
}
//删除
export function deleteRankingIntervene(data) {
  return request("post", "/list/deleteRankDetail", data);
}
// 获取策略列表
export function getStrategyList(params) {
  return request("post", "/list/queryRankList", {
    page: 1,
    size: MAXSIZE,
    ...params,
  });
}
