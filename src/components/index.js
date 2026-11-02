// 全局导入组件，以后使用不必在单独的组件中使用
import ImageView from '@/components/imageView/index.vue'
import XtxSku from "@/components/XtxSku/index.vue"
export const componentPlugin = {
  install(app) {
    app.component('ImageView', ImageView)
    app.component('XtxSku', XtxSku)
  }
}