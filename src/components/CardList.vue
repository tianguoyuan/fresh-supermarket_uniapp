<script setup lang="ts">
import type { CommonRecommendListItem, FindCommonRecommendListRes } from '@/service/common'
import { useShoppingStore } from '@/store/shopping'
import { urlEncode } from '@/utils/url'

const props = defineProps<{
  list: CommonRecommendListItem[]
  flag?: 'shopping'
}>()

const shoppingStore = useShoppingStore()
const { addShoppingList, subtractShoppingList, changeCheckedList } = shoppingStore

function pageToProductDetail(item: FindCommonRecommendListRes['list'][0]) {
  const pages = getCurrentPages()
  const path = '/' + pages[pages.length - 1].route
  uni.navigateTo({
    url: `/pages/index/productDetail?id=${item.id}&back=${urlEncode(path)}`,
  })
}

// 购物车store
function handleClickAdd(v: FindCommonRecommendListRes['list'][0]) {
  addShoppingList(v, true)
}
</script>

<template>
  <view class="rounded-2 bg-white p-3">
    <view v-for="item in props.list" :key="item.id" class="mt-3 flex first:mt-0">
      <view class="flex items-center" @click="changeCheckedList(item)">
        <view v-if="props.flag === 'shopping'" class="w-5 h-5">
          <image
            v-if="item.checked"
            src="../assets/icons/radio-checked.svg"
            class="h-full w-full"
          />
          <image v-else class="h-full w-full" src="../assets/icons/radio.svg" />
        </view>
        <view :class="[props.flag !== 'shopping' ? 'w-25 h-25' : '']" class="ml-2 h-20 w-20">
          <wd-img
            custom-style="width:100%; height:100%;"
            :src="item.cover"
            lazy-load
            enable-preview
            @click.prevent.stop
          />
        </view>
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
          <view v-if="props.flag === 'shopping'" class="flex items-center">
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

          <view v-else @click.stop.prevent="handleClickAdd(item)">
            <image src="../assets/icons/add-shopping.svg" mode="widthFix" class="w-5 mr-1" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
