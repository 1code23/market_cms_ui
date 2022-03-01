import request from "@/config/serve.js";

// 获取服务地数据
export function getmodelData(params) {
  return request("post", "/Cms/queryServiceCodeList", params, false);
}
// 新增服务地数据
export function addmodelData(params) {
  return request("post", "/Cms/createServiceCode", params, false);
}
// 修改服务地数据
export function amendModelData(params) {
  return request("get", "/Cms/updateServiceCodeStatus", params, false);
}
// 编辑服务地数据
export function updateDevice(params) {
  return request("post", "/Cms/updateServiceCode", params, false);
}
