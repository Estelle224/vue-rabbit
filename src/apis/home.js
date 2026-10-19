import httpInstance from '@/utils/https'
// 轮播数据
export function getBannerAPI() {
  return httpInstance({
    url:'/home/banner'
  })
}
//新鲜好物
export function getNewgoods() {
  return httpInstance({
    url:'/home/new'
  })
}
//人气推荐
export function getHotgoods() {
  return httpInstance({
    url:'/home/hot'
  })
}
/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
