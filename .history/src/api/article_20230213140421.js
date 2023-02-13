// 封装获取文章列表数据的接口

// 实现思路：
// 1. 找到数据接口
// 2. 封装请求方法
// 3. 请求获取数据
// 4. 模板绑定

/**
 * 文章接口模块
 */

import request from "@/utils/request";

export const getArticles = params =>{
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params
  })
}