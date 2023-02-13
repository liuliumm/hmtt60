/**
 * 封装 axios 请求模块
 */
import axios from "axios"
import store from '@/store'
// vue2: vue-router@3 vuex@3 vant@2
// vue3: vue-router@4 vuex@4 vant@3 / vant@4


// 前面 网易云音乐案例采用这个方式
// 这个方式不好的地方：它改造了axios这个包整体的配置 所以不再采用这个方式
// axios.defaults.baseURL = 'http://toutiao.itheima.net'

// 这是创建出来axios的一个实例，这个实例的使用方式跟axios一模一样
const request = axios.create({  // create会返回一个新的axios对象，
  // axios.create的详细介绍看当日资料中的离线文章
  baseURL: "http://toutiao.itheima.net" // 基础路径
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('--config: ', config)
    // 如果用户已经登录，请求携带上token
    if (store.state.user) {
      config.headers.Authorization = 'Bearer ' + store.state.user.token     
    }
    // 或者
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    // const { user } = store.state
    // if (user && user.token) {
    //   config.headers.Authorization = `Bearer ${user.token}`
    // }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器

export default request