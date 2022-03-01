import request from "@/config/serve.js";
import { MAXSIZE } from "@/common/constant/constant.js";

// 查询
export function getMarketList(params) {
  return request("post", "/market/manage/queryList", params);
}

//新增
export function addMarket(data) {
  return request("post", "/market/manage/insert", data);
}
//修改
export function updateMarket(data) {
  return request("post", "/market/manage/update", data);
}
// 复制市场
export function copyMarket(params) {
  return request("get", "/market/manage/reproduce", params);
}
// 查询市场部署的页面
export function getMarketDeployList(params) {
  return request("post", "/cmsPage/queryList", params);
}

//新增页面
export function addMarketPage(data) {
  return request("post", "/cmsPage/insert", data);
}
//修改页面
export function updateMarketPage(data) {
  return request("post", "/cmsPage/update", data);
}
//删除市场中的页面
export function deleteMarketPage(data) {
  return request("post", "/cmsPage/delete", data);
}
//同步市场中的页面
export function syncMarketPage(data) {
  return request("post", "/cmsPage/syncPage", data);
}
// 查询页面国际化列表
export function getGlobalMarketList(params) {
  return request("post", "/cmsPage/desc/queryList", params);
}
//新增页面国际化
export function addGlobalMarketPage(data) {
  return request("post", "/cmsPage/desc/insert", data);
}
//修改页面国际化
export function updateGlobalMarketPage(data) {
  return request("post", "/cmsPage/desc/update", data);
}
//删除页面国际化
export function deleteGlobalMarketPage(data) {
  return request("get", "/cmsPage/desc/delete", data);
}
// 查询历史版本列表
export function getHistoryVersion(data) {
  return request("post", "/cmsPage/historyVerson", data);
}

// 获取策略列表
export function getStrategyList(params) {
  return request("post", "/list/queryRankList", {
    page: 1,
    size: MAXSIZE,
    ...params,
  });
}
// 查询组件列表信息
export function queryAssemblyList(data) {
  return request("post", "/assembly/queryAssemblyList", data, false);
}
// 查询页面已部署的组件
export function getPageAssemblyList(data) {
  return request("post", "/cmsPage/assemblyList", data);
}
// 保存页面部署的组件
export function updatePageAssembly(data) {
  return request("post", "/cmsPage/assembly", data);
}
