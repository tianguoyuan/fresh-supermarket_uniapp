<script setup lang="ts">
import { findCommonRecommendList, type FindCommonRecommendListRes } from '@/service/common'
import CardWaterfall from './CardWaterfall.vue'

const cardList = ref<FindCommonRecommendListRes['list']>([])

const props = defineProps<{
  hideAdd?: boolean
}>()

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
      <view class="w-22px h-22px">
        <image class="w-full h-full" src="@/assets/icons/recommend-l.svg" />
      </view>
      <view class="px-3 text-4">为你推荐</view>
      <view class="w-22px h-22px">
        <image class="w-full h-full" src="@/assets/icons/recommend-r.svg" />
      </view>
    </view>

    <view class="mt-3">
      <CardWaterfall :list="cardList" :hide-add="props.hideAdd" />
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
