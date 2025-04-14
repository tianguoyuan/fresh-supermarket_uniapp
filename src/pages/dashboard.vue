<script lang="ts" setup>
import { useUserStore } from '@/store'
import PLATFORM from '@/utils/platform'

//
const { version } = __APP_INFO__.pkg

console.log('__APP_INFO__', __APP_INFO__)

const userStore = useUserStore()

function toHomePage() {
  if (userStore.token) {
    uni.switchTab({ url: '/pages/index/index' })
  } else {
    uni.redirectTo({ url: '/pages/user/login' })
  }
}
let paddingTop = 0
if (PLATFORM.isMpWeixin) {
  paddingTop = uni.getMenuButtonBoundingClientRect().top
}
</script>

<template>
  <view id="container" class="flex flex-col justify-between">
    <view class="px-7" :style="{ 'padding-top': paddingTop + 'px' }">
      <view class="pt-21 flex items-baseline">
        <view class="text-7">欢迎来到生鲜！</view>
        <view class="bg-[#1989fa] color-white px-2">{{ version }}</view>
      </view>
      <view class="mt-3 pr-10 color-#999 line-height-6">
        无论您身在何处，我们都会为您提供您喜爱的食物，以满足您的食物需求，这里是一些文字描述
      </view>

      <view
        class="mt-7 block h-11 w-45 rounded-full bg-#40AE36 text-center color-white line-height-11"
        @click="toHomePage"
      >
        现在开始
      </view>
    </view>
    <view class="mt-20 block h-260px w-full overflow-hidden">
      <image class="w-375px h-375px" src="@/assets/icons/dashboardCover.svg" />
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '欢迎进入_生鲜超市uniapp',
  },
  noNeedLogin: true,
}
</route>
