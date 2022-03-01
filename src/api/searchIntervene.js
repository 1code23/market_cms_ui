import request from "@/config/serve.js";

// api-搜索干预
export function queryKeywordConfigList(data) {
  return request("post", "/Oz/queryKeywordConfigList", data);
}
export function addKeywordConfig(data) {
  return request("post", "/Oz/addKeywordConfig", data);
}
export function updateKeywordConfig(data) {
  return request("post", "/Oz/updateKeywordConfig", data);
}
export function updateKeywordConfigStatus(data) {
  return request("get", "/Oz/updateKeywordConfigStatus", data);
}
export function selectKeywordApkList(data) {
  return request("get", "/Oz/selectKeywordApkList", data);
}
export function addKeywordApkList(data) {
  return request("post", "/Oz/addKeywordApkList", data);
}
export function selectDescList(data) {
  return request("get", "/Oz/selectDescList", data);
}
export function selectDesc(data) {
  return request("get", "/Oz/selectDesc", data);
}
export function addDescList(data) {
  return request("post", "/Oz/addDescList", data);
}
export function updateDesclList(data) {
  return request("post", "/Oz/updateDesclList", data);
}
export function deleteDesc(data) {
  return request("get", "/Oz/deleteDesc", data);
}
