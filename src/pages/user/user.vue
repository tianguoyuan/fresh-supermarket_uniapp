<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<script lang="ts" setup>
import RecommendedForYou from '@/components/RecommendedForYou.vue'
import Tabbar from '@/components/Tabbar.vue'
import { useUserStore } from '@/store'
import ListCard from './components/ListCard.vue'
import IMGMyServer1 from '@/assets/icons/myServer1.svg'
import IMGMyServer2 from '@/assets/icons/myServer2.svg'
import IMGMyServer3 from '@/assets/icons/myServer3.svg'
import IMGMyServer4 from '@/assets/icons/myServer4.svg'
import IMGMyServer5 from '@/assets/icons/myServer5.svg'
import IMGOrder1 from '@/assets/icons/order1.svg'
import IMGOrder2 from '@/assets/icons/order2.svg'
import IMGOrder3 from '@/assets/icons/order3.svg'
import IMGOrder4 from '@/assets/icons/order4.svg'
import IMGOrder5 from '@/assets/icons/order5.svg'
import { phoneMask } from '@/utils/filter'
import { openQQHref } from '@/utils/path'
import { personalIntegral, PersonalIntegralRes } from '@/service/personal'
import { useTabbarStore } from '@/store/tabbar'
import { urlEncode } from '@/utils/url'
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'User',
})
onLoad(() => {
  if (PLATFORM.isApp) uni.hideTabBar()
})

const userStore = useUserStore()
const userInfo = computed(() => userStore)

const tabbarStore = useTabbarStore()
// 订单功能
const orderList = [
  { iconClass: IMGOrder1, name: '待付款', active: true },
  { iconClass: IMGOrder2, name: '待发货' },
  { iconClass: IMGOrder3, name: '待收货' },
  { iconClass: IMGOrder4, name: '待评价' },
  { iconClass: IMGOrder5, name: '退款/售后' },
]
function onOrderListRightClick() {
  uni.navigateTo({
    url: '/pages/user/myOrder',
  })
}
function onOrderListClick(i: number) {
  uni.navigateTo({
    url: `/pages/user/myOrder?activeIndex=${i}`,
  })
}

// 我的服务
const myServerList = [
  {
    iconClass: IMGMyServer1,
    name: '收货地址',
    func: () => {
      const pages = getCurrentPages()
      const path = '/' + pages[pages.length - 1].route
      uni.navigateTo({
        url: `/pages/shopping/address?back=${urlEncode(path)}&noHandleClick=1`,
      })
    },
  },
  { iconClass: IMGMyServer2, name: '足迹' },
  { iconClass: IMGMyServer3, name: '我的收藏' },
  { iconClass: IMGMyServer4, name: '服务中心' },
  {
    iconClass: IMGMyServer5,
    name: '在线客服',
    func: openQQHref,
  },
]
function onServerListClick(i: number) {
  const item = myServerList[i]
  if (!item) return
  if (item.func) {
    item.func()
  } else {
    uni.showToast({ title: '正在开发中...', icon: 'none' })
  }
}

// 设置
const actions = ref([
  {
    value: '100',
    name: '退出登录',
  },
  {
    value: '0',
    name: '取消',
  },
])
const showSetting = ref(false)
function handleConfirm({ item }) {
  console.log('v', item, item.value)
  if (item.value === '0') {
    showSetting.value = false
  } else if (item.value === '100') {
    userStore.clearUserInfo()
    uni.reLaunch({
      url: '/pages/user/login',
    })
  }
}
function openSetting() {
  showSetting.value = true
}
function closeSetting() {
  showSetting.value = false
}

// 积分列表
const priceList = ref<PersonalIntegralRes['integralList']>([])

init()
async function init() {
  const {
    data: { integralList = [] },
  } = await personalIntegral({ userId: userInfo.value.userId })
  priceList.value = integralList
}
</script>
<template>
  <!-- 用户信息 -->
  <view class="rounded-b-10 bg-main">
    <view class="pt-safe"></view>
    <!-- 不是h5平台都需要 -->
    <view v-if="!PLATFORM.isH5" class="h-44px"></view>
    <view class="flex justify-between p-4">
      <!-- 头像信息 -->
      <view class="flex items-center">
        <view class="h-14 w-14 overflow-hidden rounded-full">
          <image :src="userInfo.userImg" alt="" class="h-full w-full" />
        </view>
        <view class="pl-4">
          <view class="text-4 color-white">
            {{ userInfo.userName }}
          </view>
          <view class="mt-1 text-3 color-white">
            {{ phoneMask(userInfo.phone) }}
          </view>
        </view>
      </view>

      <view class="text-5 flex" :class="{ 'items-end': PLATFORM.isMp }">
        <!-- 设置弹窗 -->
        <wd-action-sheet
          :close-on-click-modal="false"
          :model-value="showSetting"
          :actions="actions"
          :z-index="100"
          custom-style="margin:0;border-radius:0;"
          @close="closeSetting"
          @select="handleConfirm"
        />
        <wd-icon name="setting" color="#fff" @click="openSetting"></wd-icon>

        <view class="w-2"></view>
        <wd-icon name="call" color="#fff" @click="openQQHref()" />
      </view>
    </view>

    <!-- 我的积分 -->
    <view class="mt-1 flex pb-26 color-white">
      <view v-for="(item, index) in priceList" :key="index" class="flex-1 text-center">
        <view class="text-[18px] line-height-6">
          <wd-count-to
            :start-val="0"
            :end-val="item.value"
            :duration="3000"
            :font-size="20"
            color="#fff"
          ></wd-count-to>
        </view>
        <view class="text-3 line-height-17px">
          {{ item.label }}
        </view>
      </view>
    </view>
  </view>

  <!-- 我的订单 -->
  <view class="mt--21">
    <ListCard
      :list-data="orderList"
      right-title="全部订单"
      title="我的订单"
      @on-right-click="onOrderListRightClick"
      @on-handle-click="onOrderListClick"
    />

    <view class="h-3" />

    <ListCard
      :list-data="myServerList"
      title="我的服务"
      :icon-height="26"
      @on-handle-click="onServerListClick"
    />
  </view>
  <view class="p-3">
    <RecommendedForYou />
  </view>
  <Tabbar tabbar-path="/pages/user/user" />
</template>

<style lang="scss" scoped></style>

<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '用户中心',
  },
}
</route>
