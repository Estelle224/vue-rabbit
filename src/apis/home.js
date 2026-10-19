import httpInstance from '@/utils/https'
// 轮播数据
export function getBannerAPI() {
  return httpInstance({
    url:'/home/banner'
  })
}
