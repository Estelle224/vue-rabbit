<script setup>
// 接收props
defineProps({
  title:String,
  subTitle: {
    type: String
  }
})
</script>


<template>
  <!-- //封装组件-因为好物推荐和结构一样，所以提取组件，使用插槽和props渲染 -->
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          {{title}}<small>{{subTitle}}</small>
        </h3>
      </div>
      <!-- 主体内容区域-结构复杂使用slot接收-默认插槽，因为只有1个，多个使用具名插槽 -->
       <slot></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>