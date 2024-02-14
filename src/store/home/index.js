import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index.js'

// commit=>mutations,用来触发同步操作的方法。
// dispatch =>actions,用来触发异步操作的方法。
// 在store中注册了mutation和action，在组件中用dispatch调用action，然后action用commit调用mutation，

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
const mutations = {
  // ！！！！！此处不能加this 如this.state 加了表示的是主store的state 不加this 才是引用的本子store的state
  resCategoryList(state, categoryLists) {
    state.categoryList = categoryLists
  },
  resBannerList(state, bannerLists) {
    state.bannerList = bannerLists
  },
  resFloorList(state, floorLists) {
    state.floorList = floorLists
  }
}
// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象   context.commit('increment')
const actions = {
  async categoryList({ commit }) {
    const result = await reqCategoryList()
    // console.log(result)
    // 响应正常时(200) 返回请求到的数据
    if (result.code === 200) {
      // eslint-disable-next-line no-undef
      commit('resCategoryList', result.data.slice(0, 16))
      // console.log(result.data.slice(0, 16))
    }
  },
  async getBannerList({ commit }) {
    const result = await reqBannerList()
    if (result.code === 200) {
      commit('resBannerList', result.data)
      console.log(result.data)
    }
  },
  async getFloorList({ commit }) {
    const result = await reqFloorList()
    if (result.code === 200) {
      commit('resFloorList', result.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
