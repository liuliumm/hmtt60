// 用户相关的请求模块
import { request } from "@/utils/request";

// 用户登录
exports const login = (data) => {
    return request({
        methods: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}