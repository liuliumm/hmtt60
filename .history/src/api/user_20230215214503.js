// // 用户相关的请求模块
import request from "@/utils/request";

// import store from "@/store";

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
// export const getUserInfo = () => {
//   return request({
        // 函数必须有return来返回结果
        // 如果函数里不写return，则函数会返回undefined，可以根据需要判断是否有返回值。
        
        // export const getUserInfo = function() {return request({url: '/v1_0/user'})}
        // export const getUserInfo = () => request({url: '/v1_0/user'})
        // 因为这是一行代码，所以可以省略函数的大括号，和return。并将函数简写为箭头函数
        // 当它加了大括号"{}",就代表他是块体，在块体中，必须使用明确的return语句。
export const getUserInfo = () => 
// 调用该接口的前提是已经登陆，所以本该判断是否有数据的表达式可以省略不写
  request({
    url: '/v1_0/user',
//     // headers: {
            // X表示扩展
//     //   // 'X-Token'//也是头，只是另一种表现形式，具体可查看axios的github官方文档
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

export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}


