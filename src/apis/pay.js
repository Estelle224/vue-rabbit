import request from '@/utils/https.js'

export const getPayDetaileAPI = (id) => {
  return request({
    url:`/member/order/${id}`
  })
}