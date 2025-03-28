<script setup lang="ts">
const emits = defineEmits<{
  setSearchMsg: [val: string]
}>()

const cacheList = JSON.parse(uni.getStorageSync('historySearch') || null) || [
  '果冻橙',
  '芒果',
  '有机水果卷心菜',
  '水果萝卜',
  '熟冻帝王蟹',
  '赣南脐橙',
]

const historySearch = ref(cacheList)
watch(
  historySearch,
  () => {
    uni.setStorageSync('historySearch', JSON.stringify(historySearch.value || []))
  },
  {
    deep: true,
  },
)

const isRemoveFlag = ref(false)

function removeAllHistory() {
  historySearch.value = []
}
function historyItemClick(index: number) {
  if (!isRemoveFlag.value) {
    emits('setSearchMsg', historySearch.value[index])
  } else {
    historySearch.value.splice(index, 1)
  }
}
</script>

<template>
  <view v-if="historySearch.length" class="mx-4 mt-4">
    <view class="flex items-center justify-between line-height-5">
      <view class="color-[#0B1526]">历史搜索</view>
      <view class="flex">
        <view class="w-5 h-5" @click="isRemoveFlag = true">
          <image
            v-if="!isRemoveFlag"
            src="../../../../assets/icons/rubbish.svg"
            class="w-full h-full"
          />
        </view>
        <view v-show="isRemoveFlag" class="text-3 flex">
          <view class="color-[#8D93A6]" @click="removeAllHistory">全部删除</view>
          <view class="px-2">|</view>
          <view class="color-red" @click="isRemoveFlag = false">完成</view>
        </view>
      </view>
    </view>

    <view class="mt-3 flex flex-wrap">
      <view
        v-for="(item, index) in historySearch"
        :key="item"
        class="mb-2 mr-2 flex-shrink-0 rounded-full bg-[#f8f9fa] px-4 py-6px text-3 color-[#666] flex"
        @click="historyItemClick(index)"
      >
        <view>{{ item }}</view>
        <view class="pl-1.5">
          <wd-icon v-if="isRemoveFlag" name="close" size="10px" color="#8D93A6"></wd-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped></style>
