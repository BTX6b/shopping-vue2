import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done()
  // 响应成功的回调函数
  return res.data
}, (error) => {
  // 响应失败的回调函数
  console.log(error)
  return Promise.reject(new Error('fail'))
})

// 对外暴露
export default requests
