import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
//token的key
const TOUTIAO_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息（读取出来是字符串，直接通过parse进行转换为对象）
    // 一个对象，存储当前登录用户信息（token等数据）
    user: getItem(TOUTIAO_KEY) || null
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // user: null
  },
  getters: {// vuex的规则: 更改state数据必须走mutation函数
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      // localStorage.setItem 这个API只支持存储字符串: '[object Object]'
       // 为了防止刷新丢失，我们需要把数据备份到本地存储
      setItem(TOUTIAO_TOKEN, state.user)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(user))//localStorage只能存储字符串，所以通过stringify将user对象转换为字符串，再存储到localStorage
    }
  },
  actions: {
  },
  modules: {
  }
})
