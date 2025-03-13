<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<script lang="ts" setup>
import Tabbar from '@/components/Tabbar.vue'
import {
  findHomeFoodKindBanner,
  searchDefaultMsg,
  getHomeBanner,
  type HomeFoodKindBannerRes,
} from '@/service/home'
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'Home',
})

// 小程序显示 分享
if (PLATFORM.isMp) {
  uni.showShareMenu()
}

// 搜索框
const hotSearchMsg = ref('搜索')
function toSearchPage() {
  uni.navigateTo({ url: '/pages/index/search/search' })
}

// banner
const current = ref(0)
const swiperList = ref<{ id: string; value: string; type: 'image' }[]>([])

// 食品分类
const foodKindList = ref<HomeFoodKindBannerRes['foodKindBanner']>([])
function foodKindItemClick(name: string) {
  uni.navigateTo({
    url: `/pages/index/search/result?searchMsg=${name}`,
  })
}

onLoad(init)
async function init() {
  // 首页-搜索-默认关键词
  searchDefaultMsg().then(({ data }) => {
    hotSearchMsg.value = data.searchDefault || ''
  })

  // 顶部banner
  getHomeBanner().then(({ data: { banner } }) => {
    swiperList.value = (banner || []).map((v) => ({ id: v.id, value: v.cover, type: 'image' }))
  })

  // 食品分类
  findHomeFoodKindBanner().then(({ data: { foodKindBanner } }) => {
    foodKindList.value = foodKindBanner
  })
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
    <!-- 搜索框 -->
    <view @click="toSearchPage">
      <wd-search disabled hide-cancel :placeholder="hotSearchMsg" placeholder-left />
    </view>

    <!-- banner -->
    <view class="card-swiper mt-3">
      <wd-swiper
        v-model:current="current"
        autoplay
        custom-indicator-class="custom-indicator-class"
        :indicator="true"
        :list="swiperList"
      ></wd-swiper>
    </view>

    <!-- 食品分类 -->
    <view class="overflow-x-scroll">
      <view class="mt-5 flex">
        <view
          v-for="item in foodKindList"
          :key="item.id"
          class="w-20% flex shrink-0 flex-col overflow-hidden px-1"
          @click="foodKindItemClick(item.name)"
        >
          <view class="flex justify-center">
            <wd-img
              :src="item.cover"
              lazy-load
              class="m-auto overflow-hidden rounded-full"
              :width="54"
              :height="54"
            />
          </view>
          <view class="pt-2 text-center text-3 color-[#666]">
            <view class="line-clamp-1">
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <Tabbar tabbar-path="/pages/index/index" />
  </view>
</template>
<style lang="scss" scoped>
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #ffffff;
  --wot-swiper-nav-dot-active-color: #4d80f0;
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
