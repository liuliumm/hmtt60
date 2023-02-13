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
  request({
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




// import request from '@/utils/request'
// // import store from '@/store'

// export function login(data) {
//   return request({
//     url: 'v1_0/authorizations',
//     method: 'POST',
//     data
//   })
// }

// export const sendSms = mobile =>
//   request({
//     url: `/v1_0/sms/codes/${mobile}`
//   })

// export const getUserInfo = () =>
//   request({
//     url: '/v1_0/user'
//     // headers: {
//     //   // 'X-Token'
//     //   Authorization: 'Bearer ' + store.state.user.token
//     // }
//   })

// export const getUserChannels = () => {
//   return request({
//     url: '/v1_0/user/channels'
//   })
// }

// // function axios1(options) {
// //   const { url, method, data, params } = options
// //   // 0. 创建xhr实例对象
// //   const xhr = new XMLHttpRequest()

// //   // 1. 打开请求
// //   xhr.open(method, url, true)

// //   // 请求拦截器在这个阶段工作

// //   // 2. 发起请求
// //   xhr.send(data)

// //   // 3. 监听当前xhr请求数据的进度
// //   xhr.onreadystatechange = function () {
// //     if (xhr.readyState === 4 && xhr.status === 200) {
// //       // 请求正常响应回到客户端了，客户端接收数据
// //       console.log(xhr.responseText)
// //     }
// //   }
// // }

// // axios1({
// //   url: '',
// //   method: '',
// //   data: '',
// //   params: ''
// // })
