import requests from './request.js'
import requestMocks from './requestMock.js'
// 三级联动接口

export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
export const reqBannerList = () => requestMocks({ url: 'mock/banner', method: 'get' })
export const reqFloorList = () => requestMocks({ url: 'mock/floor', method: 'get' })
export const reqSearchList = (params) => requests({ url: '/list', method: 'post', data: params })
// 请求商品详情信息
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
