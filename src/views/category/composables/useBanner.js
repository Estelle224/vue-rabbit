import {ref,onMounted} from 'vue'
import {getBannerAPI} from '@/apis/home.js'

export function useBanner() {
  // 轮播图逻辑
const bannerList = ref([])
const getBannerOneList = () => {
  getBannerAPI({distributionSite:'2'}).then(res => {
    bannerList.value = res.data.result
  })
}
onMounted(() => {
  getBannerOneList()
})

return { bannerList }
}