<script setup>
import LayoutNav from './components/layoutNav.vue'
import LayoutHeader from './components/layoutHeader.vue'
import LayoutFooter from './components/layoutFooter.vue'
import LayoutStcky from './components/layoutStcky.vue'
import Home from '@/views/home/index.vue'
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
  <Home/>
  <RouterView />
  <LayoutFooter />
</template>
