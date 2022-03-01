import request from "@/config/serve.js";

// api-心愿单管理
export function queryWishList(data) {
  return request("post", "/appWish/queryWishList", data);
}
export function relationWishById(data) {
  return request("post", "/appWish/relationWishById", data);
}
export function updateWishById(data) {
  return request("post", "/appWish/updateWishById", data);
}
export function queryUserWishList(data) {
  return request("post", "/appWish/queryUserWishList", data);
}
