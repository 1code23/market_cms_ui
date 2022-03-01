import request from "@/config/serve.js";

// 停止服务-根据用户uuid删除相关信息
export function stopServe(params) {
  return request("get", "/Oz/deleteUserInfoByUuid", params);
}

// // 导出Excel
export function exportPrivacy(params) {
  return request("http", "/Oz/exportPrivacy", {
    method: "get",
    responseType: "blob", // 请求二进制文件流必传参数
    params: params,
  });
}
