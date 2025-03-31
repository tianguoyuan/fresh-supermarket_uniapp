<script setup lang="ts">
import type { CommonRecommendListItem } from '@/service/common'

const props = defineProps<{
  item: CommonRecommendListItem
}>()
</script>

<template>
  <view class="mt-4 first:mt-0">
    <view class="flex justify-between text-3">
      <view>生鲜快递发货</view>
      <view v-if="props.item.isOneDay" class="color-#40AE36">上架24H发货，第三方物流配送</view>
    </view>
    <view class="mt-2 flex line-height-18px">
      <view class="flex flex-1 items-center">
        <view class="h-65px w-65px flex-shrink-0 bg-#f8f9fa">
          <image :src="item.cover" class="h-full w-full" />
        </view>
        <view class="ml-3 h-full flex flex-1 flex-col justify-between">
          <view class="line-clamp-2 text-14px">{{ props.item.title }} 1kg/份</view>
          <view class="mt-5px text-3 color-#999 flex">
            <view>规格:</view>
            <view class="pl-1">1kg/份</view>
          </view>
          <view class="text-3 color-#999 flex">
            <view>数量:</view>
            <view class="pl-1">{{ props.item.num }}份</view>
          </view>
        </view>
      </view>
      <view class="w-20 text-right flex items-end">
        <view class="text-3">￥</view>
        <view>{{ props.item.price }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
