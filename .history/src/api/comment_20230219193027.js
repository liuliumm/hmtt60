/**
 * 评论接口模块
 */
import request from "@/utils/request";

/**
 * 获取评论或评论回复
 */
export function getComments(params) {
    return request({
      method: "GET",
      url: "/v1_0/comments",
      params
    });
  }