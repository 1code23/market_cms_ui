import request from "@/config/serve.js";

// 获取验证码
export function getVerifyCode(params) {
  return request("get", "/safe/getVerifyCode", params, false);
}
// 登录
export function login(params) {
  return request("post", "/safe/login", params);
}
