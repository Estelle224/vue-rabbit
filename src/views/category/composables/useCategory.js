import {ref, onMounted} from 'vue'
import {onBeforeRouteUpdate} from 'vue-router'
import {getTopCategoryAPI} from "@/apis/category.js"
import {useRoute} from 'vue-router'
export function useCategory() {
  onMounted(() => {
    getTopCategory()
  })
  const getNam = ref({})
  //通过useRoute获取地址中的参数id
  const router = useRoute()
  console.log(router, 'router')
  //默认值为router.params.id
  const getTopCategory = (parmId=router.params.id) => {
    getTopCategoryAPI(parmId).then(res => {
      getNam.value = res.data.result
      // console.log(res, '------')
    })
  }
  // 解决路由缓存方法二: 通过一个vue-route的方法-onBeforeRouteUpdate-优点：可以精准刷新具体内容
  onBeforeRouteUpdate((parms)=> {
    // 问题因为router有延后性，所以接口调用的时候是之前的-y
    // 解决办法通过传值
    console.log('0000000')
    console.log(parms)
    getTopCategory(parms.params.id)
  })
  return {getNam}
}