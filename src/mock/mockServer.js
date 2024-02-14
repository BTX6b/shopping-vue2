// 导入mock模块
import Mock from 'mockjs'
// 导入相关文件 json文件默认导出
import banner from './banner.json'
import floor from './floor.json'

Mock.mock('mock/banner', { code: 200, data: banner }) // 轮播图
Mock.mock('mock/floor', { code: 200, data: floor }) // floor层
