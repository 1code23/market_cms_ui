import request from "@/config/serve.js";
import { MAXSIZE } from "@/common/constant/constant.js";

// 查询
export function getMarketReleaseList(params) {
  return request("post", "/marketPublish/queryList", params);
}
//新增
export function addMarketRelease(data) {
  return request("post", "/marketPublish/insert", data);
}
//修改
export function updateMarketRelease(data) {
  return request("post", "/marketPublish/update", data);
}
// 获取市场列表
export function getMarketList(params) {
  return request("post", "/market/manage/queryList", {
    page: 1,
    size: MAXSIZE,
    ...params,
    isDelete: 0,
  });
}
