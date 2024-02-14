import { reqGoodsInfo } from '@/api/index.js'

// commit=>mutations,用来触发同步操作的方法。
// dispatch =>actions,用来触发异步操作的方法。
// 在store中注册了mutation和action，在组件中用dispatch调用action，然后action用commit调用mutation，

const state = {
  goodsList: {}
}
const mutations = {
  // ！！！！！此处不能加this 如this.state 加了表示的是主store的state 不加this 才是引用的本子store的state
  resGoodsInfo(state, goodsInfo) {
    state.goodsList = goodsInfo
  }
}
// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象   context.commit('increment')
const actions = {
  async getGoodsList({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    // console.log(result)
    // 响应正常时(200) 返回请求到的数据
    if (result.code === 200) {
      // eslint-disable-next-line no-undef
      commit('resGoodsInfo', result.data)
    }
  }
}
// 简化数据
const getters = {
  //  {} 防止state.goodsList为空时 出现undefined
  categoryView(state) {
    return state.goodsList.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsList.skuInfo || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
