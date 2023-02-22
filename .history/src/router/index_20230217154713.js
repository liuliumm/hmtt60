import Vue from 'vue'
// 目标: vue-router基础使用
// 1. 下载vue-router  (yarn add vue-router)
// 2. 引入
import VueRouter from 'vue-router'
import { NavBar, Form, Field, Button, Toast, Tabbar, TabbarItem } from 'vant';
import { Icon, Image as VanImage, Tab, Tabs, Search, Cell, CellGroup } from 'vant';
import { List } from 'vant';




// 3. 注册全局组件
Vue.use(VueRouter)
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(VanImage);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Search);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);

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
    // name: 'layout',  // 如果父路由有默认子路由，那他的name就没有意义，可以省略
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由，只能有一个，当访问/的时候，显示home组件
        name: 'home',//这里写name是为了让":to"使用命名的路由的形式进行页面的跳转，这样做是为了解决当"to='/'"时不论哪个页面home页面对应的图标一直保持高亮
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }

    ]
  },
  {  //搜索路由
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  // {
  //   path: '/article/:articleId', //需要传递文章id
  //   name: 'article',
  //   component: () => import('@/views/article'),
  //    // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
  //   props: true
  // },
]
// 5. 生成路由对象
const router = new VueRouter({
  routes// routes是固定key(传入规则数组)
  // mode: "history" // 默认不写是"hash"
})

export default router
