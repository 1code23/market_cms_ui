import request from "@/config/serve.js";

// 查询
export function getUserLoginLog(params) {
  return request("post", "/userLoginLog/getUserLoginLog", params);
}
