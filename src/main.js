import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
//导入公共样式文件
import './styles/common.scss'
// 引入pinia
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {lazyPlugin} from '@/directives/index.js'
//引入全局导出的组件
import {componentPlugin} from '@/components/index.js'
const app = createApp(App)

const pinia = createPinia()
//每个人和每个项目提供对 Pinia store 的持久化
pinia.use(piniaPluginPersistedstate)
//引入自定义指令
app.use(lazyPlugin)
app.use(componentPlugin)
app.use(router)
app.use(pinia)
app.mount('#app')