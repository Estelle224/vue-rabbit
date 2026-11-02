import { defineStore } from "pinia";
import {computed, ref} from 'vue'
//定义购物车相关内容
export const useCartStore =  defineStore('cartStore', () => {
  const cartList = ref([])
  const editCartList = (parms) => {
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
  //删除加入购物车中的数据
  const delCart = (skuId) => {
    // 删除方法1.使用index+splice 2. filter筛选-会产生一个新数组，原数组保持不变
    cartList.value = cartList.value.filter(item => item.skuId !== skuId)
  }
  // 使用计算属性-计算一下商品的总数量和总价格
  const getCount = computed(()=> {
    // 1.计算一下商品购物车商品总数量
    return  cartList.value.reduce((sum,item)=> sum + item.count, 0)
  })
  const getSumPrice = computed(() => {
    return cartList.value.reduce((sum,item)=>  sum + Number(item.price)*item.count, 0)
  })
  return {
    cartList,
    editCartList,
    delCart,
    getSumPrice,
    getCount
  }
})