<script setup lang="ts">
import { findCommonRecommendList, type FindCommonRecommendListRes } from '@/service/common'
import CardWaterfall from './CardWatefall.vue'

const cardList = ref<FindCommonRecommendListRes['list']>([])

async function init() {
  const { data } = await findCommonRecommendList({
    pageNum: 1,
    pageSize: 10,
    order: 'asc',
  })
  const { list } = data
  cardList.value = list

  console.log('list', list)
}

init()

defineExpose({
  init,
})
</script>

<template>
  <view class="mt-6">
    <view class="flex items-center justify-center">
      <image class="w-22px h-22px" src="@/assets/icons/recommend-l.svg" />
      <view class="px-3 text-4">为你推荐</view>
      <image class="w-22px h-22px" src="@/assets/icons/recommend-r.svg" />
    </view>

    <view class="mt-3">
      <CardWaterfall :list="cardList" v-bind="$attrs" />
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
