<script setup>
defineProps({
  pictureList: {
    type: Array,
    default: () => []
  }
})
import { ref, watch } from 'vue';
import { useMouseInElement } from '@vueuse/core'
// 1.实现点击小图，将大图替换-通过所用实现图片的切换
const imgIndex = ref(0)
const checkImg = (i) => {
  imgIndex.value = i
}
// 2.实现鼠标移动，阴影盒子跟随的效果，获取当前的鼠标的位置根据，（useMouseInElement）
//  1.阴影的可移动区域（鼠标有效移动区域） 2.计算鼠标的移动的边界值
const target = ref(null)
const {elementX, elementY,isOutside} = useMouseInElement(target)
console.log(elementX, elementY,isOutside)
const x = ref(0)
const y = ref(0)
const lagerx = ref(0)
const lagery = ref(0)
// 监听变量-修改滑块的位置
watch([elementX, elementY,isOutside], () => {
  //  1.阴影的可移动区域（鼠标有效移动区域）-有效范围内控制滑块距离
  // 横向
  if (isOutside.value) return 
  console.log(elementX, elementY,isOutside)
  if (elementX.value > 100 && elementX.value < 300) { 
      x.value = elementX.value - 100
  }
  if (elementY.value > 100 && elementY.value < 300) {
      y.value = elementY.value - 100
  }
  // 临界值处理
  if (elementX.value < 100) {x.value = 0}
  if (elementX.value > 300) {x.value = 200}
  if (elementY.value < 100) {y.value = 0}
  if (elementY.value > 300) {y.value = 200}
  // 大图的展示逻辑-移动方向相反，距离*2
  lagerx.value = -x.value*2
  lagery.value = -y.value*2
})


</script>


<template>
  <!-- {{elementX}}-{{elementY }}-{{isOutside}} -->
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="pictureList[imgIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `${x}px`, top: `${y}px` }" v-show="!isOutside"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in pictureList" :key="i" @mouseenter="checkImg(i)" :class="i ===imgIndex? 'active': '' ">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" v-show="!isOutside" :style="[
      {
        backgroundImage: `url(${pictureList[imgIndex]})`,
        backgroundPositionX: `${lagerx}px`,
        backgroundPositionY: `${lagery}px`,
      },
    ]"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>