import httpInstance from '@/utils/https'
/**
 * @description: 获取商品详情
 * @param {*} id 分类id 
 * @return {*}
 */
export const getLoginAPI = ({account,password}) => {
  return httpInstance({
    url: '/login',
    method:'POST',
    data: {
      account,
      password
    }
  })
}