<script setup>
import {getBannerAPI} from '@/apis/home.js'
import { onMounted, ref } from 'vue';
onMounted(() => {
  getBanner()
})
const bannerList = ref([])
const getBanner = async() => {
  getBannerAPI().then((res)=> {
    console.log('00000',res)
    bannerList.value = res.data.result
  })
}
</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  //绝对定位跟分类重合
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>