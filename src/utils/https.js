import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// 请求拦截器传递token
import {useUserInfo} from '@/stores/userInfo.js'
import { useRouter } from 'vue-router'
const router = useRouter()
// 创建axios实例
const httpInstance = axios.create({
  //设置一个公共路径
  baseURL: '/api',
  //设置超时时间
  timeout: 5000
})
// 请求拦截器
httpInstance.interceptors.request.use(config => {
  // 请求头添加token
  const userinfoStore = useUserInfo()
  const token = userinfoStore?.userInfo?.token
  console.log('请求头是偶', token)
  if(token) {
    //  config.headers.Authorization = `Bearer ${token}`
      config.headers.set('Authorization', `Bearer ${token}`); 
  }
  return config
}, e => Promise.reject(e))
// 响应拦截器
httpInstance.interceptors.response.use(config => {
  return config
}, e => {
  ElMessage({type:'error', message:e.response?.data?.message})
  console.log(e, '策划书')
  // 处理401报错
  if (e.response?.data?.status ==='401') {
    // 1.清空用户数据
    userInfoStore.clearUserInfo()
    // 2.跳转到登录页面
    router.push({path: '/login'})
  }
  return  Promise.reject(e)
})

export default httpInstance