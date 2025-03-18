<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<script lang="ts" setup>
import Tabbar from '@/components/Tabbar.vue'

defineOptions({
  name: 'Shopping',
})

function pageToHome() {
  uni.switchTab({
    url: '/pages/index/index',
  })
}
</script>
<template>
  <wd-navbar title="购物车" fixed placeholder safe-area-inset-top>
    <template #right>
      <view class="color-#999 text-14px">删除</view>
    </template>
  </wd-navbar>
  <view class="p-3">
    <!-- 没有加购 -->
    <view class="flex flex-col items-center justify-center rounded-2 bg-white py-5">
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
