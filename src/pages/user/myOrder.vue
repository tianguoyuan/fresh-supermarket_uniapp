<script lang="ts" setup>
defineOptions({
  name: 'UserMyOrder',
})

function pageBack() {
  uni.navigateBack()
}
function pageToHome() {
  uni.reLaunch({
    url: '/pages/index/index',
  })
}

const tabList = [
  { name: '全部' },
  { name: '待付款' },
  { name: '待发货' },
  { name: '待收货' },
  { name: '待评价' },
  { name: '退款/售后' },
]
const tab = ref('Design')
</script>

<template>
  <wd-navbar title="我的订单" left-arrow fixed placeholder safe-area-inset-top>
    <template #capsule>
      <wd-navbar-capsule @back="pageBack" @back-home="pageToHome" />
    </template>
  </wd-navbar>

  <wd-tabs v-model="tab" sticky>
    <block v-for="item in tabList" :key="item.name">
      <wd-tab :title="item.name"></wd-tab>
    </block>
  </wd-tabs>
  <view class="flex flex-col items-center">
    <image class="mt-20% w-25" mode="widthFix" src="../../assets/icons/emptyListData.svg" />
    <view class="mt-10 text-4 color-#999">抱歉，没有找到订单哦</view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '用户-我的订单',
    navigationStyle: 'custom',
  },
}
</route>
