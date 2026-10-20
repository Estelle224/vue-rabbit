import httpInstance from '@/utils/https'
// 轮播数据-改早传参区分首页和一级分类下的轮播
export function getBannerAPI(params={}) {
   // 默认为1 商品为2
  const {distributionSite = '1'} = params
  return httpInstance({
    url:'/home/banner',
    params:{
      distributionSite
    }
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
