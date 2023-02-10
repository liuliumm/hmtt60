import Vue from 'vue'
// 目标: vue-router基础使用
// 1. 下载vue-router  (yarn add vue-router)
// 2. 引入
import VueRouter from 'vue-router'
// 3. 注册全局组件
Vue.use(VueRouter)
// 4. 规则数组
const routes = []
// 5. 生成路由对象
const router = new VueRouter({
  routes// routes是固定key(传入规则数组)
  // mode: "history" // 默认不写是"hash"
})

export default router
