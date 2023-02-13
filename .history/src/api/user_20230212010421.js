// 用户相关的请求模块
import request from "@/utils/request";

// 用户登录
// export const login = (data) => {
//     return request({
//         method: 'POST',
//         url: '/v1_0/authorizations',
//         data
//     })
// }
export function login(data) {
    return request({
      url: 'v1_0/authorizations',
      method: 'POST',
      data
    })
  }

// 发送验证码
export const sendSms = mobile => {
    return request({
      method: 'GET',
      url: `/v1_0/sms/codes/${mobile}`
    })
}