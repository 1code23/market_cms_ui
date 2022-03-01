import request from "@/config/serve.js";

// api-角标管理
export function queryCornerList(data) {
  return request("post", "/ozCorner/queryCornerList", data);
}
export function insertCorner(data) {
  return request("post", "/ozCorner/insertCorner", data);
}
export function updateCornerByCornerId(data) {
  return request("post", "/ozCorner/updateCornerByCornerId", data);
}
export function deleteCornerByCornerId(data) {
  return request("post", "/ozCorner/deleteCornerByCornerId", data);
}
export function queryInternationalCornerList(data) {
  return request("post", "/ozCorner/queryInternationalCornerList", data);
}
export function insertCornerLanguage(data) {
  return request("post", "/ozCorner/insertCornerLanguage", data);
}
export function updateCornerDescById(data) {
  return request("post", "/ozCorner/updateCornerDescById", data);
}
export function deleteCornerById(data) {
  return request("post", "/ozCorner/deleteCornerById", data);
}
export function insertCornerApk(data) {
  return request("post", "/ozCorner/insertCornerApk", data);
}
export function queryCornerApkList(data) {
  return request("post", "/ozCorner/queryCornerApkList", data);
}
