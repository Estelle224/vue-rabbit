import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getLoginAPI} from '@/apis/login.js'
import {useCartStore} from './cartStore.js'
export const useUserInfo = defineStore('userInfo', () => {
  const cartStore = useCartStore()
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
    //合并购物车-将未登录时添加的数据+登录后的数据合并
    cartStore.mergeCartlist()
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