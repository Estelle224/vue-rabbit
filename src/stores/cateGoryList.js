import {defineStore} from 'pinia'
import { getCateGoryAPI} from '@/apis/layout.js' 
import { ref } from 'vue'
export const useCateGoryList = defineStore('getCateGory',() =>{
const cateGoryList = ref([])
const getCateGoryList = async() => {
  const res = await getCateGoryAPI()
  console.log(res, '999999999')
  if (res.data.code === '1') {
    console.log('-------')
    cateGoryList.value = res.data.result
  }
}
return {cateGoryList,getCateGoryList}
})

