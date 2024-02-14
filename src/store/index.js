import Vue from 'vue'
import Vuex from 'vuex'

// 导入其它组件的store
import home from '@/store/home/index.js'
import search from '@/store/search/index.js'
import detail from '@/store/detail/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    home,
    search,
    detail
  }
})
