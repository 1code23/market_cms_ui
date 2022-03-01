import request from "@/config/serve.js";

// 查询
export function getFeedBackList(params) {
  return request("post", "/feed/queryFeedBackList", params);
}
