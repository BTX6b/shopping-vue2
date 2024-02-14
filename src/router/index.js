import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入路由组件
import Home from '@/views/home/Home.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import Search from '@/views/search/Search.vue'
import Detail from '@/views/detail/Detail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/detail/:skuid?',
    component: Detail,
    meta: {
      isShow: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      isShow: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isShow: false
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isShow: false
    }
  },
  { // 路由组件的params参数加上？代表值可传可不传
    path: '/search/:keyword?',
    component: Search,
    meta: {
      isShow: true
    },
    name: 'search'
    // 路由组件可以通过props传递数据
    // 共有三种写法 布尔 props：true 对象 props: {a: 1, b: 2} 函数写法 props:($route) => ({keyword: $route.params.keyword})

  },
  // 重定向
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})

export default router
