<script lang="ts" setup>
import { type kindListRes } from '@/service/kind'
const props = defineProps<{
  listData: kindListRes['module']
}>()
</script>

<template>
  <view v-for="(item, index) in props.listData" :key="index" class="category m-3">
    <view class="text-3 color-gray font-600">{{ item.moduleTitle }}</view>
    <view v-for="(cell, cellIndex) in item.list" :key="cellIndex" class="flex my-3">
      <view class="mr-3">
        <wd-img class="w-110px h-110px" :src="cell.cover" lazy-load enable-preview />
      </view>
      <view class="flex flex-col justify-between flex-1">
        <view>
          <view class="text-14px line-clamp-2">{{ cell.title }}</view>
          <view class="text-3 mt-1 color-gray">{{ cell.desc }}</view>
        </view>
        <view>
          <view class="flex">
            <view class="border border-solid border-#F55726 px-[2px] text-[9px] color-#F55726">
              特价
            </view>

            <view
              class="ml-1 border border-solid px-[2px] text-[9px] color-primary border-color-primary"
            >
              24H发货
            </view>
          </view>
          <view
            class="mt-2px flex justify-between whitespace-nowrap line-height-22px align-baseline"
          >
            <view class="flex">
              <view class="text-[10px] color-#F55726">￥</view>
              <view class="text-4 color-#F55726">{{ cell.price }}</view>
              <view class="ml-2px text-3 color-#999">/箱</view>
            </view>
            <image src="../assets/icons/add-shopping.svg" mode="widthFix" class="w-5 mr-1" />
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="h-5"></view>
</template>

<style lang="scss" scoped>
//
</style>
