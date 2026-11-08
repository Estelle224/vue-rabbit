import {onUnmounted, ref, computed} from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
  const time = ref(0)
  let timer= null
  const formateTime = computed(()=> {
    return dayjs.unix(time.value).format('mm分ss秒')
  })
  const start = (t1) => {
    time.value = t1
    timer = setInterval(()=> {
      if(time.value > 0) {
        time.value--
      }else {
        time.value= 0
      }
    },1000)
  }
  //组件销毁清楚定时器
  onUnmounted(() => {
    clearInterval(timer)
  })
  return {
    formateTime,
    start,
  }
}