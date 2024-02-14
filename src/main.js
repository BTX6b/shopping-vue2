import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册全局组件
import TypeNav from '@/components/typeNav/TypeNav.vue'
import Carousel from '@/components/carousel/Carousel.vue'
import Pagination from '@/components/pagination/Pagination.vue'
// 启动引入mockServer
import '@/mock/mockServer'
// 引入swiper样式文件 全局
import 'swiper/css/swiper.css'
//  test api
// import { reqCategoryList } from '@/api/index.js'
// console.log(reqCategoryList())
// 第一个参数：组件的name属性 第二个参数：引入的组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
