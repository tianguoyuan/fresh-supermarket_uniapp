<script lang="ts" setup>
import { PageEnum } from '@/enums/PageEnum'
import { urlDecode } from '@/utils/url'
import { storeToRefs } from 'pinia'
import { openQQHref } from '@/utils/path'
import { useShoppingStore } from '@/store/shopping'
import { findCommonRecommendListFindOne, FindCommonRecommendListFindOneRes } from '@/service/common'

defineOptions({
  name: 'IndexProductDetail',
})
//
const pathParams = ref<{ id: string; back: string }>({ id: '', back: '' })
onLoad((query) => {
  pathParams.value.id = query.id ? query.id : ''
  pathParams.value.back = query.back ? urlDecode(query.back) : ''
})

function pageBack() {
  if (pathParams.value.back) {
    const pushType = PageEnum.TABBAR_PAGE_LIST.includes(pathParams.value.back.split('?')?.[0])
      ? 'switchTab'
      : 'redirectTo'

    console.log(
      'pushType',
      pushType,
      PageEnum.TABBAR_PAGE_LIST,
      pathParams.value.back.split('?')?.[0],
    )

    uni[pushType]({
      url: pathParams.value.back,
    })
  } else {
    uni.switchTab({
      url: '/pages/index/index',
    })
  }
}

const shoppingStore = useShoppingStore()
const { shoppingList } = storeToRefs(shoppingStore)
const { addShoppingList } = shoppingStore

const data = ref<FindCommonRecommendListFindOneRes>({
  checked: false,
  cover: '',
  coverList: [],
  desc: '',
  id: '',
  isBargainPrice: false,
  isOneDay: false,
  num: 0,
  oldPrice: '',
  price: '',
  tagList: [],
  title: '',
})
// banner
const current = ref(0)

async function init() {
  const result = await findCommonRecommendListFindOne(pathParams.value.id)
  data.value = result.data
}

onMounted(() => {
  init()
})

// 规格信息
const distributionMode = ref([
  { label: '产地', value: '安徽' },
  { label: '规格', value: '180g/份' },
  { label: '保质期', value: '30天' },
  { label: '储存方式', value: '冷藏' },
])

// 收藏
const isCollect = ref(false)
</script>

<template>
  <wd-navbar
    title="产品详情"
    fixed
    placeholder
    safe-area-inset-top
    left-arrow
    @click-left="pageBack"
  ></wd-navbar>

  <!-- banner -->
  <view class="card-swiper">
    <wd-swiper
      v-model:current="current"
      autoplay
      custom-indicator-class="custom-indicator-class"
      :indicator="true"
      :list="data.coverList"
    ></wd-swiper>
  </view>

  <!-- 价钱介绍 -->
  <view class="m-3 rounded-2 bg-white p-3">
    <view class="flex items-center justify-between">
      <view class="flex items-end">
        <view class="text-[10px] color-#F55726">￥</view>
        <view class="text-4 color-#F55726">{{ data?.price }}</view>
        <view class="ml-2px text-3 color-#999">/箱</view>
      </view>
      <view class="text-9px color-#999 flex">
        <view v-for="item in data?.tagList" :key="item" class="pl-2px">
          <view class="ml-1 border border-#ccc border-solid rounded-1 px-2px">{{ item }}</view>
        </view>
      </view>
    </view>
    <view class="line-clamp-2 mt-1 text-18px line-height-6">
      {{ data?.title }}
    </view>
    <view class="mt-2 flex items-center text-3 color-#666">
      <view class="rounded-1 bg-#40AE36 px-1 py-2px color-white">产地量贩</view>
      <view class="pl-1">基地优选</view>
      <view class="pl-1">售后无忧</view>
    </view>
  </view>

  <!-- 配送优惠 -->
  <view
    v-if="data?.isOneDay && data?.isBargainPrice"
    class="m-3 rounded-2 bg-white p-3 line-height-4"
  >
    <view v-if="data.isOneDay" class="flex text-3">
      <view class="w-10 flex-shrink-0 color-#999">配送</view>
      <view>上架24H发货，第三方物流配送，免运费</view>
    </view>
    <view v-if="data.isBargainPrice" class="flex text-3">
      <view class="w-10 flex-shrink-0 color-#999">服务</view>
      <view>品质保证，生鲜不支持7天无理由退货</view>
    </view>
    <view v-if="data.isBargainPrice" class="flex text-3">
      <view class="w-10 flex-shrink-0 color-#999">优惠</view>
      <view class="line-height-4">特价商品每人限购2份</view>
    </view>
  </view>

  <!-- 规格信息 -->
  <view class="m-3 rounded-2 bg-white p-3">
    <view class="text-14px">规格信息</view>
    <view class="mt-3 overflow-hidden border-1px border-#ececec rounded-1 border-solid">
      <view
        v-for="item in distributionMode"
        :key="item.label"
        class="h-7 flex border-0 border-t-1px border-solid border-#ececec line-height-7 first:border-t-0"
      >
        <view
          class="w-21 border-0 border-r-1px border-solid border-#ececec bg-#f8f9fa px-3 color-#666"
        >
          {{ item.label }}
        </view>
        <view class="ml-4">
          {{ item.value }}
        </view>
      </view>
    </view>
  </view>

  <view class="h-16" />
  <view class="pb-safe fixed bottom-0 left-0 right-0 flex items-center bg-white pl-3">
    <view class="flex text-3">
      <view class="flex flex-col items-center" @click="isCollect = !isCollect">
        <view class="w-5 h-5">
          <image v-if="isCollect" class="h-full w-full" src="../../assets/icons/collect-full.svg" />
          <image v-else src="../../assets/icons/collect.svg" class="h-full w-full" />
        </view>
        <view class="mt-1">收藏</view>
      </view>
      <view class="ml-3 flex flex-col items-center" @click="openQQHref">
        <view class="w-5 h-5">
          <image src="../../assets/icons/customerService.svg" class="w-full h-full" />
        </view>
        <view class="mt-1" @click="openQQHref">客服</view>
      </view>
    </view>
    <view
      class="m-3 flex flex-1 items-center justify-center rounded-full py-3 color-white bg-main"
      @click="data && addShoppingList(data, true)"
    >
      加入购物车
    </view>
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
    height: 240px !important;
  }
  :deep(.wd-swiper__image) {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '产品详情',
  },
}
</route>
