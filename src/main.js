import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
//导入公共样式文件
import './styles/common.scss'
// 引入pinia
import {createPinia} from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
