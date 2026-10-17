import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import {getCategoryAPI} from '@/apis/text.js'
//导入公共样式文件
import './styles/common.scss'

const app = createApp(App)
app.use(router)
app.mount('#app')
