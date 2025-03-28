<script setup lang="ts">
import { findSearchHotTag, type SearchHotTagItem } from '@/service/home'

const emits = defineEmits<{
  setSearchMsg: [val: string]
}>()
const list = ref<SearchHotTagItem[]>([])
function handleClick(item: SearchHotTagItem) {
  emits('setSearchMsg', item.name)
}

init()
function init() {
  findSearchHotTag().then(({ data }) => {
    list.value = data.list
  })
}
</script>

<template>
  <view v-if="list.length" class="mx-4 mt-4">
    <view class="flex items-center justify-between line-height-5">
      <view class="color-[#0B1526]">热门搜索</view>
    </view>

    <view class="mt-3 flex flex-wrap">
      <view
        v-for="item in list"
        :key="item.name"
        class="mb-2 mr-2 flex-shrink-0 rounded-full bg-[#f8f9fa] px-4 py-6px text-3 color-[#666]"
        @click="handleClick(item)"
      >
        <view>{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>
