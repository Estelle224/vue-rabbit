import { defineStore } from "pinia";
import {computed, ref} from 'vue'
import {useUserInfo} from './userInfo.js'
import {insertCartAPI, cartlistAPI, delCartAPI, mergeCartlistAPI} from '@/apis/cart.js'

//定义购物车相关内容
export const useCartStore =  defineStore('cartStore', () => {
  // 在函数被调用时才获取 Store，此时 Pinia 已就绪
  const userInfoStore = useUserInfo()
  const cartList = ref([])
  //刷新购物车列表
  const refreshCartList = async() => {
    // 2.刷新购物车列表
      const  res = await cartlistAPI()
      // 3.更新cartlist
      cartList.value =  res.data.result
  }
  //添加到购物车
  const editCartList = async(parms) => {
    //根据当前登录用户是否登录-来看加入购物车是走接口还是本地
    const ifLogin = userInfoStore.userInfo.token
    if (ifLogin) {
      //已经登录
      // 1.调用添加接口
      await insertCartAPI({skuId:parms.skuId , count:parms.count})
      refreshCartList()
    } else {
      console.log(parms, 'parms')
      const ifExit = cartList.value.find(item => item.skuId === parms.skuId)
      console.log(ifExit, 'ifExit')
      if (ifExit) {
        // 1.如果该商品已经存在于当前购物车-直接count+1就可以
        ifExit.count += parms.count
      } else {
        // 2.如果不存在-直接将商品push到List上
        cartList.value.push(parms)
      }
    }
  }
  //删除加入购物车中的数据
  const delCart = async(skuId) => {
    const ifLogin = userInfoStore.userInfo.token
    if (ifLogin) {
       //已经登录
      // 1.调用添加接口
      await delCartAPI([skuId])
      refreshCartList()
    } else {
      console.log(skuId, 'skuId ')
      // 删除方法1.使用index+splice 2. filter筛选-会产生一个新数组，原数组保持不变
      cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
  }
  //修改购物车的选中状态
  const editSelectStatus = (status,skuId) => {
    const selectItem = cartList.value.find(item => item.skuId === skuId)
    selectItem.selected = status
  }
  //合并未登录购物城和购物城列表
  const mergeCartlist = async() => {
   let parms =  cartList.value.map(el => {
    return {  
      skuId: el.skuId,
      selected: el.selected,
      count: el.count
    }
  })
  await mergeCartlistAPI(parms)
   refreshCartList()
  }
  // 全选状态
  const changeAllCheckout = (sel) => {
    console.log(sel, '-------')
    
    cartList.value = cartList.value.map(el => {
      return {
        ...el,
        selected: sel
      }
    })
    //修改ref定义有俩层响应式-.value+里边的每一个键值对对用proxy定义
    // cartList.value.forEach(el => {
    //   el.selected = sel
    // })
  }
  const clearCart = () => {
    cartList.value = []
  }
  // 使用计算属性-计算一下商品的总数量和总价格
  const getCount = computed(()=> {
    // 1.计算一下商品购物车商品总数量
    return  cartList.value.reduce((sum,item)=> sum + item.count, 0)
  })
  const getSumPrice = computed(() => {
    return cartList.value.reduce((sum,item)=>  sum + Number(item.price)*item.count, 0)
  })
  const getSelCount = computed(() => {
    return cartList.value.reduce((sum,item)=> {
      if(item.selected) {
        return sum + item.count
      } else {
        return sum
      }
    }, 0)
  })
  const getSelPrice = computed(() => {
    return cartList.value.reduce((sum,item)=> {
      if(item.selected) {
        return sum + Number(item.price)*item.count
      } else {
        return sum
      }
    }, 0)
  })
  // 计算全选状态
  const ifAllSelect = computed( () => {
    console.log( cartList.value.every(item => item.selected), '-----------')
    return cartList.value.every(item => item.selected)  
  })
  return {  
    cartList,
    editCartList,
    delCart,
    getSumPrice,
    getCount,
    ifAllSelect,
    editSelectStatus,
    changeAllCheckout,
    getSelCount,
    getSelPrice,
    clearCart,
    mergeCartlist
  }
},{
  persist: true,
})