<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useShoppingStore } from '@/store/shopping'
import type { FindCommonRecommendListRes } from '@/service/common'
import { urlEncode } from '@/utils/url'

const shoppingStore = useShoppingStore()
const { shoppingList } = storeToRefs(shoppingStore)
const { addShoppingList, subtractShoppingList, changeCheckedList } = shoppingStore

function pageToProductDetail(item: FindCommonRecommendListRes['list'][0]) {
  const pages = getCurrentPages()
  const path = '/' + pages[pages.length - 1].route
  uni.navigateTo({
    url: `/pages/index/productDetail?id=${item.id}&back=${urlEncode(path)}`,
  })
}
</script>

<template>
  <view class="rounded-2 bg-white p-3">
    <view v-for="item in shoppingList" :key="item.id" class="mt-3 flex first:mt-0">
      <view class="flex items-center" @click="changeCheckedList(item)">
        <image v-if="item.checked" src="../../../assets/icons/radio-checked.svg" class="h-5 w-5" />
        <image v-else class="h-5 w-5" src="../../../assets/icons/radio.svg" />

        <image class="ml-2 h-20 w-20" :src="item.cover" lazy-load />
      </view>
      <view class="ml-3 flex flex-1 flex-col justify-between">
        <view class="line-clamp-2" @click="pageToProductDetail(item)">
          {{ item.title }}
        </view>
        <view v-if="item.isBargainPrice && item.isBargainPrice" class="mt-1 flex">
          <view
            v-if="item.isBargainPrice"
            class="border border-solid border-#F55726 px-[2px] text-[9px] color-#F55726"
          >
            特价
          </view>
          <view
            v-if="item.isOneDay"
            class="ml-1 border border-solid px-[2px] text-[9px] color-primary border-color-primary"
          >
            24H发货
          </view>
        </view>

        <view
          v-if="item.isOneDay && item.oldPrice"
          class="mt-2 text-3 flex items-end color-#ccc line-through"
        >
          ￥{{ item.oldPrice }}
        </view>

        <view class="mt-2px flex justify-between">
          <view class="flex">
            <view class="text-[10px] color-#F55726">￥</view>
            <view class="text-4 color-#F55726">{{ item.price }}</view>
          </view>
          <view class="flex items-center">
            <view
              class="h-5 w-5 rounded-full bg-#f8f9fa text-center line-height-5"
              @click="subtractShoppingList(item)"
            >
              -
            </view>
            <view class="px-3">
              {{ item.num }}
            </view>
            <view
              class="h-5 w-5 rounded-full bg-#f8f9fa text-center line-height-5"
              @click="addShoppingList(item)"
            >
              +
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
