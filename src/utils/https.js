import axios from 'axios'

// 创建axios实例
const httpInstance = axios.create({
  //设置一个公共路径
  baseURL: '/api',
  //设置超时时间
  timeout: 5000
})
// 请求拦截器
httpInstance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))
// 响应拦截器
httpInstance.interceptors.response.use(config => {
  return config
}, e => Promise.reject(e))

export default httpInstance