//createRouter:创建路由实例
//createWebHashHistory:使用has模式为history
import {createRouter,createWebHashHistory} from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //配置路由的地方-path和component对应的位置
  routes:[{
    path: '/',
    component: Layout,
    // children: [{
    //   //默认展示，路由地址置空
    //   path:'',
    //   component: Home,
    // },{
    //   path:'/category',
    //   component: Category,
    // }]
  }, {
    path: '/login',
    component: Login
  }]
}) 

export default router
