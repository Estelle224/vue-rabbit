import httpInstance from '@/utils/https'
//获取全部商品分类
export function getCateGoryAPI() {
  return httpInstance({
    url:'/home/category/head'
  })
}
