<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<script lang="ts" setup>
import Tabbar from '@/components/Tabbar.vue'
import { getHomeBanner } from '@/service'
import { searchDefaultMsg } from '@/service/home'
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'Home',
})

// 小程序显示 分享
if (PLATFORM.isMp) {
  uni.showShareMenu()
}

const current = ref(0)
const swiperList = ref([])

const hotSearchMsg = ref('搜索')
onLoad(init)
async function init() {
  searchDefaultMsg().then(({ data }) => {
    hotSearchMsg.value = data.searchDefault || ''
  })

  getHomeBanner().then(({ data: { banner } }) => {
    console.log('homeBannerList', banner)
    swiperList.value = (banner || []).map((v) => ({ id: v.id, value: v.cover, type: 'image' }))
  })
}

function toSearchPage() {
  uni.navigateTo({ url: '/pages/index/search' })
}
</script>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared', // 解除样式隔离
  },
}
</script>
<template>
  <wd-navbar title="" fixed placeholder safe-area-inset-top custom-class="!bg-main">
    <template #left>
      <view>
        <wd-icon name="location" color="white"></wd-icon>
        <!-- #ifndef H5 -->
        <wd-icon name="scan" color="white" custom-class="ml-5"></wd-icon>
        <wd-icon name="share" color="white" custom-class="ml-5"></wd-icon>
        <!-- #endif -->
      </view>
    </template>
    <!-- #ifdef H5 -->
    <template #right>
      <view>
        <wd-icon name="scan" color="white"></wd-icon>
        <wd-icon name="share" color="white" custom-class="ml-5"></wd-icon>
      </view>
    </template>
    <!-- #endif -->
  </wd-navbar>
  <view class="p-3">
    <view @click="toSearchPage">
      <wd-search disabled hide-cancel :placeholder="hotSearchMsg" placeholder-left />
    </view>

    <view class="card-swiper mt-3">
      <wd-swiper
        v-model:current="current"
        autoplay
        custom-indicator-class="custom-indicator-class"
        :indicator="true"
        :list="swiperList"
      ></wd-swiper>
    </view>

    <Tabbar tabbar-path="/pages/index/index" />
  </view>
</template>
<style lang="scss" scoped>
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #e7e7e7;
  --wot-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 24px;
  :deep(.custom-indicator-class) {
    color: white;
  }
  :deep(.custom-image) {
    border-radius: 12px;
  }
  :deep(.wd-swiper__item) {
    padding: 0;
  }
  :deep(.wd-swiper__track) {
    height: 120px !important;
  }
  :deep(.wd-swiper__image) {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>

<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
  needLogin: true, // 是否需要登录标识
}
</route>
