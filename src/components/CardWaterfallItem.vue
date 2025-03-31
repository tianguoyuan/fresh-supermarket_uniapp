<script lang="ts" setup>
import type { FindCommonRecommendListRes } from '@/service/common'
import { useShoppingStore } from '@/store/shopping'

const props = defineProps<{
  item: FindCommonRecommendListRes['list'][0]
  hideAdd?: boolean
}>()

function pageToProductDetail() {
  const pages = getCurrentPages()
  const path = '/' + pages[pages.length - 1].route
  uni.navigateTo({
    url: `/pages/index/productDetail?id=${props.item.id}&back=${path}`,
  })
}
// 购物车store
const shoppingStore = useShoppingStore()
const { addShoppingList } = shoppingStore

function handleClickAdd(v: FindCommonRecommendListRes['list'][0]) {
  addShoppingList(v, true)
}
</script>

<template>
  <view class="rounded-3 overflow-hidden mb-3" @click="pageToProductDetail">
    <view class="w-full bg-white p-3">
      <view class="w-36 h-36">
        <wd-img custom-style="width:100%; height:100%;" :src="item.cover" lazy-load />
      </view>
      <view class="mt-1 text-[14] line-height-[18px] line-clamp-2">
        {{ props.item.title }}
      </view>

      <view>
        <view class="flex mt-3">
          <view
            v-if="props.item.isBargainPrice"
            class="border border-solid border-#F55726 px-[2px] text-[9px] color-#F55726"
          >
            特价
          </view>

          <view
            v-if="props.item.isOneDay"
            class="ml-1 border border-solid px-[2px] text-[9px] color-primary border-color-primary"
          >
            24H发货
          </view>
        </view>
        <view class="mt-1 flex justify-between whitespace-nowrap align-baseline">
          <view class="flex items-end">
            <view class="text-[10px] color-#F55726">￥</view>
            <view class="text-4 color-#F55726">{{ item.price }}</view>
            <view class="ml-2px text-3 color-#999">/箱</view>
          </view>
          <view @click.stop.prevent="handleClickAdd(props.item)">
            <image
              v-if="!props.hideAdd"
              src="../assets/icons/add-shopping.svg"
              mode="widthFix"
              class="w-5 mr-1"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
