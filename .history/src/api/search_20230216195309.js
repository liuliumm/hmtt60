
// 因为request在request.js页面设置了默认导出，所以不需要添加大括号
import request from "@/utils/request";
/**
 * 获取搜索联想建议
 */
export const getSearchSuggestions = params =>
    request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params
    })
