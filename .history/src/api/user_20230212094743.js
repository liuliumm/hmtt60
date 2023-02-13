// // 用户相关的请求模块
import request from "@/utils/request";

// // 用户登录
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


// // 发送验证码
export const sendSms = mobile => {
    return request({
      method: 'GET',
      url: `/v1_0/sms/codes/${mobile}`
    })
}

// /*获取用户自己的信息*/
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
//     // headers: {
//     //   // 'X-Token'
//     //   Authorization: 'Bearer ' + store.state.user.token
//     // }
//     // method: 'GET', //可以不写
//     // // // // // 发送请求头数据
//     // headers: { //优化token，封装在了axios中，这里不写
//     // // //   // 注意：该接口需要授权才能访问
      
//     // // //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
//     //   Authorization: `Bearer ${store.state.user.token}`
      
//     // }
  })
}
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}


