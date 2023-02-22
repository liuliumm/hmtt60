import request from '@/utils/request'

// get delete 的参数固定配置axios的params配置项上

// 查询搜索建议项
export const getSearchSuggestion = params =>
  request({
    url: '/v1_0/suggestion',
    params
  })

// 查询搜索结果
export const getSearchResult = params =>
  request({
    url: 'v1_0/search',
    params
  })
