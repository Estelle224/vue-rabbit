<script setup>
import {onMounted, ref} from 'vue'
import {getCategoryFilterAPI, getSubCategoryAPI} from '@/apis/category.js'
import { useRoute } from 'vue-router'
import GoodsItem  from '../home/components/goodsItem.vue'
import router from '@/router'
//面包屑
const getBreadMsg = ref({})
const getParms = useRoute()
console.log(getParms, 'getParms')
const getSubBread = () => {
  getCategoryFilterAPI(getParms.params.id).then((res) => {
    getBreadMsg.value = res.data.result
    // console.log(res, '======')
  })
}
onMounted(() => {
  getSubBread()
  getSubCategory()
})
//获取商品数据
const goodList = ref([])
const displayDat = ref(false)
const subCategoryParms = ref({
  categoryId: getParms.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getSubCategory = () => {
  getSubCategoryAPI(subCategoryParms.value).then(res => {
    // console.log(res, '-------')
    goodList.value = res.data.result.items
  })
}
// 触底加载
const loadMoreData = async() => {
  console.log('触底加载')
  // 分页+1
  subCategoryParms.value.page++
  //调用方法
  getSubCategoryAPI(subCategoryParms.value).then((res) => {
    console.log(res, '-----')
    goodList.value = [...goodList.value, ...res.data.result.items]
    //当列表返回为空的情况下，不需要重复调用接口，停掉触底加载
    if (res.data.result.items.length === 0 ) {
      displayDat.value= true
    }
    console.log(goodList, '-----')
  })
}
// tab切换
const tabChange = (val) => {
  console.log(val,'-----')
 subCategoryParms.value.page = 1

 getSubCategory()
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${getBreadMsg.parentId}` }">{{getBreadMsg.parentName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{getBreadMsg.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="subCategoryParms.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="loadMoreData" :infinite-scroll-disabled="displayDat">
         <!-- 商品列表-->
          <GoodsItem v-for="item in goodList" :key="item.id" :good="item"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>