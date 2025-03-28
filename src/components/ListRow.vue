<script lang="ts" setup>
import { FindCommonRecommendListRes } from '@/service/common'
import { type kindListRes } from '@/service/kind'
import { useShoppingStore } from '@/store/shopping'
const props = defineProps<{
  listData: kindListRes['module']
}>()

const instance = getCurrentInstance()

defineExpose({
  instance,
})

const shoppingStore = useShoppingStore()
const { addShoppingList } = shoppingStore

function handleClickAdd(v: FindCommonRecommendListRes['list'][0]) {
  addShoppingList(v, true)
}

function pageToProductDetail(v: FindCommonRecommendListRes['list'][0]) {
  const pages = getCurrentPages()
  const path = '/' + pages[pages.length - 1].route
  uni.navigateTo({
    url: `/pages/index/productDetail?id=${v.id}&back=${path}`,
  })
}
</script>

<template>
  <view v-for="(item, index) in props.listData" :key="index" class="category m-3">
    <view class="text-3 color-gray font-600">{{ item.moduleTitle }}</view>
    <view v-for="(cell, cellIndex) in item.list" :key="cellIndex" class="flex my-3">
      <view class="mr-3 w-27 h-27">
        <wd-img
          custom-style="width:100%; height:100%;"
          :src="cell.cover"
          lazy-load
          enable-preview
        />
      </view>
      <view class="flex flex-col justify-between flex-1" @click="pageToProductDetail(cell)">
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

            <view class="w-5 h-5" @click.stop.prevent="handleClickAdd(cell)">
              <image src="../assets/icons/add-shopping.svg" class="w-full h-full mr-1" />
            </view>
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
