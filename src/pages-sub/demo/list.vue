<script setup>
import { ref } from 'vue'
import { getHomeBanner } from '@/service/home'
const paging = ref(null)
// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
const dataList = ref([])

// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
const queryList = (pageNo, pageSize) => {
  // 此处请求仅为演示，请替换为自己项目中的请求
  getHomeBanner({ pageNo, pageSize })
    .then((res) => {
      // 将请求结果通过complete传给z-paging处理，同时也代表请求结束，这一行必须调用
      paging.value.complete(res.data.banner)
    })
    .catch((res) => {
      // 如果请求失败写paging.value.complete(false);
      // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      paging.value.complete(false)
    })
}
</script>

<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList">
    <!-- z-paging默认铺满全屏，此时页面所有view都应放在z-paging标签内，否则会被盖住 -->
    <!-- 需要固定在页面顶部的view请通过slot="top"插入，包括自定义的导航栏 -->
    <view v-for="(item, index) in dataList" :key="index" class="item">
      <view class="item-title">{{ item.id }}</view>
      <wd-img :width="100" :height="100" :src="item.cover" />
    </view>
  </z-paging>
</template>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'demo-list',
  },
}
</route>
