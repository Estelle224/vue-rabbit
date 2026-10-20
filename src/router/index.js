//createRouter:创建路由实例
//createWebHashHistory:使用has模式为history
import {createRouter,createWebHashHistory} from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import Category from '@/views/category/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/detail/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //配置路由的地方-path和component对应的位置
  routes:[{
    path: '/',
    component: Layout,
    children: [{
      //默认展示，路由地址置空
      path:'',
      component: Home,
    },{
      path:'category/:id',
      component: Category,
    }, {
      path: 'category/sub/:id',
      component: SubCategory
    }, {
      path:'detail/:id',
      component: Detail

    }]
  }, {
    path: '/login',
    component: Login
  }]
}) 

export default router
