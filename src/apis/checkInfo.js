import httpInstance from '@/utils/https'

export const getOrderPreAPI = () => {
  return httpInstance({
    url:'/member/order/pre'
  })
}
// 提交订单
export const submitOrder = (data) => {
  return httpInstance({
    url:'/member/order',
    method:'POST',
    data
  })
}