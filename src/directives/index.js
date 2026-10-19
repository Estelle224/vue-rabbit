// main.js只起到引入的作用-所以需要将指令给单独提出来
// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin  = {
  install(app) {
    // 懒加载指令逻辑
   app.directive('lazyimage', {
      mounted(el,binding) {
        // el-指令绑定到的元素
        // binding.value-指令绑定的值
        //获取图片是
        // 否已经在页面里了vueuse
       const {stop}  = useIntersectionObserver(
          el,
          ([entry]) => {
            console.log(entry, '00000000')
            console.log(entry.isIntersecting, '----')
            //在试图中
            if (entry.isIntersecting) {
              // 进入视口区域-修改src为图片地址
              el.src = binding.value
              // 优化点2:想实现，只有在第一的时候加载，不需要重复执行
              stop()
            }
          },
        )
        console.log(el, binding.value)
      }
    })
 }
}
