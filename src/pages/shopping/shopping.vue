<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<script lang="ts" setup>
import RecommendedForYou from '@/components/RecommendedForYou.vue'
import Tabbar from '@/components/Tabbar.vue'
import { useShoppingStore } from '@/store/shopping'
import PLATFORM from '@/utils/platform'
import ShoppingCard from './components/ShoppingCard.vue'
import { storeToRefs } from 'pinia'
import { useMessage } from 'wot-design-uni'

defineOptions({
  name: 'Shopping',
})

onLoad(() => {
  if (PLATFORM.isApp) uni.hideTabBar()
})

const message = useMessage()

const shoppingStore = useShoppingStore()
const { shoppingList, checkedList, isAllChecked, priceSum } = storeToRefs(shoppingStore)
const { changeAllCheckedList, removeCheckedList } = shoppingStore

function pageToHome() {
  uni.switchTab({
    url: '/pages/index/index',
  })
}

async function handleClickRemove() {
  await message.confirm({
    title: '提示',
    msg: '是否删除选中商品？',
  })
  removeCheckedList()
}

function pageToSettleAccount() {
  if (!checkedList.value.length) return
  uni.navigateTo({
    url: '/pages/shopping/settleAccount',
  })
}
</script>
<template>
  <wd-navbar title="购物车" fixed placeholder safe-area-inset-top>
    <!-- #ifdef MP-WEIXIN -->
    <template #left>
      <view
        :class="[checkedList.length ? 'color-#000' : 'color-#999']"
        class="text-14px"
        @click="handleClickRemove"
      >
        删除
      </view>
    </template>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <template #right>
      <view
        :class="[checkedList.length ? 'color-#000' : 'color-#999']"
        class="text-14px"
        @click="handleClickRemove"
      >
        删除
      </view>
    </template>
    <!-- #endif -->
  </wd-navbar>
  <view>
    <view class="p-3 flex-1 relative">
      <!-- 没有加购 -->
      <view
        v-if="!shoppingList.length"
        class="flex flex-col items-center justify-center rounded-2 bg-white py-5"
      >
        <view>购物车空空如也</view>
        <view class="mt-1 text-xs color-[#999]">赶紧慰劳一下自己吧</view>
        <view
          class="mt-3 border rounded-full px-6 py-2 color-primary border-color-primary border-solid"
          @click="pageToHome"
        >
          去逛逛
        </view>
      </view>

      <!-- 加购列表 -->
      <view v-else>
        <ShoppingCard v-if="shoppingList.length" :list="shoppingList" />
      </view>

      <!-- 为你推荐 -->
      <RecommendedForYou />
      <!-- 底部 占位 -->
      <view>
        <view class="py-2 h-[50px]"></view>
        <view class="pb-safe-tabbar"></view>
      </view>
      <!-- 全选，结算 -->
      <view class="fixed bottom-0 left-0 right-0">
        <view
          class="h-[50px] flex items-center justify-between border-t border-[#f7f8f9] bg-white px-3 py-2"
        >
          <view class="flex items-center" @click="changeAllCheckedList">
            <image
              v-if="isAllChecked"
              src="@/assets/icons/radio-checked.svg"
              class="w-18px h-18px"
            />
            <image v-else src="@/assets/icons/radio.svg" class="w-18px h-18px" />
            <view class="ml-1">全选</view>
          </view>
          <view class="flex items-center">
            <view class="text-3">合计:</view>
            <view class="ml-1 text-10px color-#F55726">￥</view>
            <view class="text-4 color-#F55726">{{ priceSum }}</view>
            <view
              class="ml-3 rounded-full px-6 py-2 color-white"
              :class="[checkedList.length ? 'bg-main' : 'bg-#999 pointer-events-none']"
              @click="pageToSettleAccount"
            >
              去结算
            </view>
          </view>
        </view>
        <view class="pb-safe-tabbar"></view>
      </view>
    </view>
  </view>
  <Tabbar tabbar-path="/pages/shopping/shopping" />
</template>

<style lang="scss" scoped></style>

<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '购物车',
  },
}
</route>
