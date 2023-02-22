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
    // 这里使用parms是因为还有两个必传参数没有传递。
    // 动态路由参数传递只能用params
    // params发送的参数也是地址的一部分
    // axios的params配置项会把参数自动写到url?后面
  })
}