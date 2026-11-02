import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getLoginAPI} from '@/apis/login.js'
export const useUserInfo = defineStore('userInfo', () => {
  // 1.定义用户信息-存入state
  const userInfo= ref(null)
  // 2.登录方法
  const geUserApi = async({account,password}) => {
    const res = await getLoginAPI({
      account,
      password,
    })
    console.log(res, '登录吃啥adddd')
    userInfo.value = res.data.result
  }
  // 4.清空用户数据
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  // 3.导出-需要导出，才能在浏览器插件看到
  return {userInfo,geUserApi,clearUserInfo}

},
{
  persist: true,
})