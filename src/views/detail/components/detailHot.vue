<script setup>
import {fetchHotGoodsAPI} from '@/apis/detail.js'
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'

const fetchHotGoodsList = ref([])
const getRoute= useRoute()
const prop = defineProps({
  goodType:String
})
const getFetchHotGoods = async () => {
  const res = await fetchHotGoodsAPI({
    id: getRoute.params.id,
    type: prop.goodType
  })
  fetchHotGoodsList.value = res.data.result
  console.log('热榜24h', res)
}
onMounted(() => {
  getFetchHotGoods()
})
</script>


<template>
  <div class="goods-hot">
    <h3>周日榜单</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in fetchHotGoodsList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{item.name}}</p>
      <p class="desc ellipsis">{{item.desc}}</p>
      <p class="price">&yen;{{item.price}}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>