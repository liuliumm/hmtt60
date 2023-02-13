import Vue from 'vue'
// 目标: vue-router基础使用
// 1. 下载vue-router  (yarn add vue-router)
// 2. 引入
import VueRouter from 'vue-router'
import { NavBar, Form, Field, Button, Toast, Tabbar, TabbarItem } from 'vant';





// 3. 注册全局组件
Vue.use(VueRouter)
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);

// 4. 规则数组
const routes = [
  {
    path: '/login',
    name: 'login',  
    component: () => import('@/views/login')
    // 这里是路由懒加载的写法
    // 完整写法是：@views/login/index.vue，但是index.vue可以省略，导入一个目录时默认导入目录下的index.vue
  },
  {
    path: '/',
    // name: 'layout',  
    component: () => import('@/views/layout')
  }
]
// 5. 生成路由对象
const router = new VueRouter({
  routes// routes是固定key(传入规则数组)
  // mode: "history" // 默认不写是"hash"
})

export default router
