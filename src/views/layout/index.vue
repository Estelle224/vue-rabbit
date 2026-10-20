<script setup>
import LayoutNav from './components/layoutNav.vue'
import LayoutHeader from './components/layoutHeader.vue'
import LayoutFooter from './components/layoutFooter.vue'
import LayoutStcky from './components/layoutStcky.vue'
import { onMounted } from 'vue'
import {useCateGoryList} from '@/stores/cateGoryList.js'
const cateGoryLister = useCateGoryList()

onMounted(() => {
  //执行获取分类数据-存在pinia中  
  cateGoryLister.getCateGoryList()
})
</script>

<template>
  <LayoutNav />
  <LayoutStcky/>
  <LayoutHeader />
  <!-- 解决路由缓存问题：方法一:通过加key强制刷新整个路由区域 -->
   <!-- {{ $route.fullPath }} -->
  <!-- <RouterView :key="$route.fullPath"/> -->
   <RouterView></RouterView>
  <LayoutFooter />
</template>
