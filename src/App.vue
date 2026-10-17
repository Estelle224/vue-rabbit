<script setup>
import { onMounted, reactive, ref } from 'vue'
import {getCategoryAPI} from '@/apis/text.js'
// const getCategoryAPI1 = async() => {
//   const res = await getCategoryAPI()
//   console.log(res, 'ressss')
// }
// onMounted(() => {
//   getCategoryAPI1()
// })
</script>

<template>
  
  <!-- 一级路由出口 -->
  <RouterView/>
</template>

<style scoped>

</style>
