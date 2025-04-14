<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<script lang="ts" setup>
import CardItem from '@/components/CardItem.vue'
import CardWaterfall from '@/components/CardWaterfall.vue'
import Tabbar from '@/components/Tabbar.vue'
import { CommonBaseListParams } from '@/service/common'
import {
  findHomeFoodKindBanner,
  findSearchDefaultMsg,
  getHomeBanner,
  findHomeGreatDealList,
  type HomeFoodKindBannerRes,
  type FindHomeGreatDealListRes,
  type FindHomeTagListRes,
  findHomeTagList,
  findHomeList,
  FindHomeListRes,
} from '@/service/home'
import { openAppShare, openScan } from '@/utils/path'
import PLATFORM from '@/utils/platform'
import { urlEncode } from '@/utils/url'

defineOptions({
  name: 'Home',
})

onLoad(() => {
  if (PLATFORM.isApp) uni.hideTabBar()
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

// 超划算列表
const greatDealData = ref<FindHomeGreatDealListRes>({
  desc: '',
  id: '',
  list: [],
  title: '',
})
function pageToGreatDealMore() {
  uni.navigateTo({
    url: `/pages/index/search/search?msg=${greatDealData.value.title}&back=${urlEncode('/home')}`,
  })
}
// 列表标签
const tagList = ref<FindHomeTagListRes['tagList']>([])
const tagIndex = ref<string>('')

const dataList = ref<FindHomeListRes['list']>([])
const total = ref(-1)
const isMore = ref(true)
const initPageParams: CommonBaseListParams = {
  pageNum: 1,
  pageSize: 10,
  order: 'asc',
}
const pageParams = ref<CommonBaseListParams>({
  ...initPageParams,
})

function getTagDataList(initFlag: boolean = false) {
  if (initFlag) {
    pageParams.value = { ...initPageParams }
    isMore.value = true
    dataList.value = [] // 解决列表不刷新问题 TnWaterFall bug
  }
  if (!isMore.value) return
  findHomeList({ ...pageParams.value, tagId: tagIndex.value }).then(({ data }) => {
    dataList.value = initFlag ? data.list : dataList.value.concat(data.list)
    total.value = data.total

    if (pageParams.value.pageNum >= 5) {
      isMore.value = false
    } else {
      isMore.value = true
      pageParams.value.pageNum += 1
    }
  })
}
// 获取标签列表
watch(tagIndex, () => {
  getTagDataList(true)
})
onReachBottom(() => {
  getTagDataList()
})

onLoad(init)
async function init() {
  // 首页-搜索-默认关键词
  findSearchDefaultMsg().then(({ data }) => {
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

  // 超划算
  findHomeGreatDealList({ pageNum: 1, pageSize: 3, order: 'asc' }).then(({ data }) => {
    greatDealData.value = data
  })

  // 列表标签
  findHomeTagList().then(({ data }) => {
    tagList.value = data.tagList
    tagIndex.value = data.tagList[0]?.id
  })

  // 获取标签列表
  // getTagDataList(true)
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
        <template v-if="PLATFORM.isMp">
          <wd-icon name="scan" color="white" custom-class="ml-5" @click="openScan"></wd-icon>
          <wd-icon name="share" color="white" custom-class="ml-5" @click="openAppShare"></wd-icon>
        </template>
      </view>
    </template>
    <template v-if="!PLATFORM.isMp" #right>
      <view>
        <wd-icon name="scan" color="white" @click="openScan"></wd-icon>
        <wd-icon name="share" color="white" custom-class="ml-5" @click="openAppShare"></wd-icon>
      </view>
    </template>
  </wd-navbar>
  <view class="p-3">
    <!-- 搜索框 -->
    <view class="relative">
      <wd-search
        disabled
        hide-cancel
        :placeholder="hotSearchMsg"
        placeholder-left
        custom-class="searchBox"
      />
      <view class="absolute left-0 right-0 top-0 bottom-0" @click="toSearchPage"></view>
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
          class="w-22% flex shrink-0 flex-col overflow-hidden px-1"
          @click="foodKindItemClick(item.name)"
        >
          <view class="flex justify-center">
            <view class="w-54px h-54px overflow-hidden rounded-full m-auto">
              <wd-img :src="item.cover" lazy-load :width="54" :height="54" />
            </view>
          </view>
          <view class="pt-2 text-center text-3 color-[#666]">
            <view class="line-clamp-1">
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 超划算 -->
    <view class="mt-3 rounded-2 bg-white py-3 pb-0">
      <view class="flex justify-between px-3">
        <view class="flex items-end">
          <view class="text-4">{{ greatDealData.title }}</view>
          <view class="ml-1 rounded-2px bg-#EC9F09 px-2px py-2px text-9px color-white">
            {{ greatDealData.desc }}
          </view>
        </view>
        <view class="text-3 color-primary" @click="pageToGreatDealMore">查看全部</view>
      </view>
      <view class="grid grid-cols-3 mt-10px">
        <CardItem
          v-for="item in greatDealData.list.slice(0, 3)"
          :key="item.id"
          :item="item"
          single
        />
      </view>
    </view>

    <!-- 列表标签 -->
    <view class="mt-5 flex">
      <view
        v-for="(item, index) in tagList"
        :key="item.id"
        class="relative flex-1 flex-shrink-0 items-center text-center"
        @click="tagIndex = item.id"
      >
        <view
          class="text-4 line-height-5"
          :class="[tagIndex === item.id ? 'color-#40AE36' : 'color-#333']"
        >
          {{ item.title }}
        </view>
        <view class="flex justify-center">
          <view
            class="text-3 line-height-4 transition-all"
            :class="[
              tagIndex === item.id ? 'rounded-full bg-main px-6px color-white' : 'color-#999 ',
            ]"
          >
            {{ item.desc }}
          </view>
        </view>
        <view
          v-if="index !== tagList.length - 1"
          class="absolute bottom-0 right-0 top-0 m-auto h-18px w-1px bg-#ececec"
        />
      </view>
    </view>
    <view class="h-4"></view>

    <CardWaterfall :list="dataList" />
    <view v-if="!isMore" class="color-#999 text-3 center">暂无更多</view>
  </view>
  <Tabbar tabbar-path="/pages/index/index" />
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

:deep(.searchBox) {
  background-color: transparent !important;
}
</style>

<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
    onReachBottomDistance: 100,
  },
  needLogin: true, // 是否需要登录标识
}
</route>
