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

/**
 * 获取频道的文章列表
 */
export const getArticles = params =>{
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params
    // 编程式导航 - 跳转传参
    // 语法 query / params 任选 一个
    // 格外注意: 使用path会自动忽略params
    // 这里使用parms是因为还有两个必传参数没有传递。
  })
}