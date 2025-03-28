<script setup lang="ts">
import type { CommonRecommendListItem, FindCommonRecommendListRes } from '@/service/common'
import { useShoppingStore } from '@/store/shopping'

const props = defineProps<{
  item: CommonRecommendListItem
  hideAdd?: boolean
  single?: boolean
}>()

const urlParams = ref<{ [key: string]: string }>({})
onLoad((query) => {
  urlParams.value = query
})

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
  <view class="block bg-white p-3" @click="pageToProductDetail">
    <view class="w-23 h-23">
      <wd-img custom-style="width:100%; height:100%;" :src="props.item.cover" lazy-load />
    </view>
    <view
      class="mt-1 text-[14] line-height-[18px]"
      :class="[props.single ? 'color-#666 text-3 line-clamp-1' : 'line-clamp-2']"
    >
      {{ props.item.title }}
    </view>
    <view v-if="!props.single" class="mt-3">
      <view
        v-if="props.item.isBargainPrice"
        class="border border-#F55726 px-[2px] text-[9px] color-#F55726"
      >
        特价
      </view>
      <view
        v-if="props.item.isOneDay"
        class="ml-1 border px-[2px] text-[9px] color-primary border-color-primary"
      >
        24H发货
      </view>
    </view>
    <view class="mt-[10px] flex items-center justify-between">
      <view class="whitespace-nowrap flex items-end">
        <view class="text-[10px] color-#F55726">￥</view>
        <view class="text-4 color-#F55726">{{ props.item.price }}</view>
        <view v-if="!props.single" class="ml-2px text-3 color-#999">/箱</view>
      </view>
      <view v-if="!props.hideAdd" @click.stop.prevent="handleClickAdd(props.item)">
        <image src="../assets/icons/add-shopping.svg" class="h-5" mode="heightFix" />
      </view>
    </view>
  </view>
</template>

<style scoped></style>
