<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'
defineOptions({
  name: 'ShoppingPaymentResult',
})

const message = useMessage()

const pathParams = ref<{ listData: { label: string; value: string }[] }>({ listData: [] })

onLoad((query) => {
  pathParams.value.listData = query.listData ? JSON.parse(query.listData) : []

  if (!pathParams.value.listData.length) {
    message
      .confirm({
        title: '提示',
        msg: '页面参数错误',
        showCancelButton: false,
      })
      .then(() => {
        uni.reLaunch({
          url: '/pages/index/index',
        })
      })
  }
})

function pageToHome() {
  uni.reLaunch({
    url: '/pages/index/index',
  })
}
</script>

<template>
  <wd-navbar title="确认订单" fixed placeholder left-arrow safe-area-inset-top>
    <template #capsule>
      <view @click="pageToHome">
        <wd-icon name="home1"></wd-icon>
      </view>
    </template>
  </wd-navbar>

  <view class="mx-3">
    <view class="flex items-center justify-center">
      <view class="w-15 h-15 mt-13">
        <image class="w-full h-full" lazy-load src="../../assets/icons/radio-checked.svg"></image>
      </view>
    </view>
    <view class="mt-3 text-center line-height-21px">付款成功</view>

    <view class="mt-7 rounded-8px bg-white p-3 line-height-5">
      <view
        v-for="(v, i) in pathParams.listData"
        :key="i"
        class="flex justify-between border-b border-#ececec py-3 last:border-b-0 first:pt-0 last:pb-0"
      >
        <view class="color-#999">{{ v.label }}</view>
        <view>{{ v.value }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '确认订单',
  },
}
</route>
