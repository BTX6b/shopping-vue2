import { reqCategoryList, reqSearchList } from '@/api/index.js'

const state = {
  searchList: {}
}
const mutations = {
  resSearchList(state, data) {
    state.searchList = data
  }
}
const actions = {
  async categoryList() {
    const result = await reqCategoryList()
    console.log(result)
  },
  async getSearchList({ commit }, params = {}) {
    const result = await reqSearchList(params)
    if (result.code === 200) {
      commit('resSearchList', result.data)
    }
  }
}
// 计算属性 简化属性
const getters = {
  // ||[] 防止state出现undefined的情况
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
