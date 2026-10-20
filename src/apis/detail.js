import httpInstance from '@/utils/https'
/**
 * @description: 获取商品详情
 * @param {*} id 分类id 
 * @return {*}
 */
export const getDetailAPI = (id) => {
  return httpInstance({
    url: '/goods',
    params: {
      id
    }
  })
}
