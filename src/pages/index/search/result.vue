<script lang="ts" setup>
import CardList from '@/components/CardList.vue'
import {
  CommonBaseListParams,
  findCommonRecommendList,
  FindCommonRecommendListRes,
} from '@/service/common'

//
const searchMsg = ref('')
onLoad((query) => {
  searchMsg.value = query.searchMsg ? decodeURIComponent(query.searchMsg) : ''
})

function pageBack() {
  uni.redirectTo({
    url: '/pages/index/search/search',
  })
}
function pageToHome() {
  uni.switchTab({
    url: '/pages/index/index',
  })
}
const initPageParams: CommonBaseListParams = {
  pageNum: 1,
  pageSize: 10,
  order: 'asc',
  priceOrder: '',
  saleOrder: '',
}
const pageParams = ref<CommonBaseListParams>({
  ...initPageParams,
})
const list = ref<FindCommonRecommendListRes['list']>([])
init()
function init() {
  findCommonRecommendList({
    ...pageParams.value,
    order: 'asc',
    title: searchMsg.value,
  }).then(({ data }) => {
    list.value = data.list
  })
}
</script>

<template>
  <wd-navbar :title="searchMsg" left-arrow fixed placeholder safe-area-inset-top>
    <template #capsule>
      <wd-navbar-capsule @back="pageBack" @back-home="pageToHome" />
    </template>
  </wd-navbar>

  <CardList :list="list" />
</template>

<style lang="scss" scoped>
//
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '搜索结果',
  },
}
</route>
