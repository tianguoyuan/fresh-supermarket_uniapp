<script lang="ts" setup>
import { findSearchDefaultMsg } from '@/service/home'
import HistorySearch from './components/HistorySearch.vue'
import HotSearch from './components/HotSearch.vue'
import { urlEncode } from '@/utils/url'

function pageBack() {
  uni.switchTab({
    url: '/pages/index/index',
  })
}

const searchMsg = ref('')

const placeholderSearch = ref('')
function search(val: string = searchMsg.value) {
  let copySearchMsg = ''
  if (val) {
    copySearchMsg = val
  } else if (!searchMsg.value) {
    copySearchMsg = placeholderSearch.value
  }
  // 搜索接口
  uni.navigateTo({
    url: `/pages/index/search/result?searchMsg=${encodeURIComponent(copySearchMsg)}`,
  })
}

init()
function init() {
  findSearchDefaultMsg().then(({ data }) => {
    placeholderSearch.value = data.searchDefault || ''
  })
}
</script>

<template>
  <view id="container" class="bg-white">
    <wd-navbar title="搜索" fixed placeholder safe-area-inset-top left-arrow @click-left="pageBack">
      <template #title>
        <view class="mt-5px">
          <wd-search
            v-model="searchMsg"
            hide-cancel
            :placeholder="placeholderSearch"
            placeholder-left
            custom-class="searchBox"
            @search="search()"
          />
        </view>
      </template>
    </wd-navbar>

    <!-- 历史搜索 -->
    <HistorySearch @set-search-msg="search" />

    <!-- 热门搜索 -->
    <HotSearch @set-search-msg="search" />
  </view>
</template>

<style lang="scss" scoped>
//
:deep(.searchBox) {
  .wd-search__block {
    border-radius: 0 !important;
  }
}
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '搜索',
  },
}
</route>
