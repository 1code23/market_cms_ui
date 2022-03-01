import request from "@/config/serve.js";

// api-评论管理
export function queryCommentList(data) {
  return request("post", "/ozComment/queryCommentList", data);
}
export function queryDetails(data) {
  return request("post", "/ozComment/queryDetails", data);
}
export function updateAuditStatusByCommentId(data) {
  return request("post", "/ozComment/updateAuditStatusByCommentId", data);
}
export function queryReportList(data) {
  return request("post", "/ozComment/queryReportList", data);
}
export function querySensitiveWordsList(data) {
  return request("post", "/Oz/querySensitiveWordsList", data);
}
export function createSensitiveWords(data) {
  return request("post", "/Oz/createSensitiveWords", data);
}
export function updateSensitiveWords(data) {
  return request("post", "/Oz/updateSensitiveWords", data);
}
export function updateSensitiveWordsStatus(data) {
  return request("get", "/Oz/updateSensitiveWordsStatus", data);
}
