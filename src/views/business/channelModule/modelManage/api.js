import request from "@/config/serve.js";

// 获取机型数据
export function getmodelData(params) {
  return request("post", "/Cms/queryDeviceList", params, false);
}
// 新增机型数据
export function addmodelData(params) {
  return request("post", "/Cms/createDevice", params, false);
}
// 修改机型数据
export function amendModelData(params) {
  return request("get", "/Cms/updateDeviceStatus", params, false);
}
// 编辑机型数据
export function updateDevice(params) {
  return request("post", "/Cms/updateDevice", params, false);
}
