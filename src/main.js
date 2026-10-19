import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
//导入公共样式文件
import './styles/common.scss'
// 引入pinia
import {createPinia} from 'pinia'
import {lazyPlugin} from '@/directives/index.js'
const app = createApp(App)

const pinia = createPinia()
//引入自定义指令
app.use(lazyPlugin)
app.use(router)
app.use(pinia)
app.mount('#app')