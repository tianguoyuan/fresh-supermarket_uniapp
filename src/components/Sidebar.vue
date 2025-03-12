<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getRect, isArray } from 'wot-design-uni/components/common/util'
import { type kindListRes } from '@/service/kind'

const active = ref<number>(1)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const props = defineProps<{
  listData: kindListRes['module']
}>()

watch(
  props.listData,
  async (v) => {
    if (!v.length) return
    await nextTick()
    getRect('.category', true).then((rects) => {
      console.log('rects', rects)

      if (isArray(rects)) {
        itemScrollTop.value = rects.map((item) => item.top || 0)
        scrollTop.value = rects[active.value].top || 0
      }
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

function handleChange({ value }) {
  active.value = value
  scrollTop.value = itemScrollTop.value[value]
}
function onScroll(e) {
  const { scrollTop } = e.detail
  const threshold = 50 // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0
    return
  }
  const index = itemScrollTop.value.findIndex(
    (top) => top > scrollTop && top - scrollTop <= threshold,
  )
  if (index > -1) {
    active.value = index
  }
}
</script>

<template>
  <view class="h-full flex">
    <wd-sidebar v-model="active" @change="handleChange">
      <wd-sidebar-item
        v-for="(item, index) in props.listData"
        :key="index"
        :value="index"
        :label="item.moduleTitle"
        custom-class="text-3"
      />
    </wd-sidebar>
    <scroll-view
      class="flex-1"
      scroll-y
      scroll-with-animation
      :scroll-top="scrollTop"
      :throttle="false"
      @scroll="onScroll"
    >
      <view v-for="(item, index) in props.listData" :key="index" class="category m-3">
        <view class="text-3 color-gray">{{ item.moduleTitle }}</view>
        <view v-for="(cell, cellIndex) in item.list" :key="cellIndex" class="flex my-3">
          <view class="mr-3">
            <image class="w-110px" mode="widthFix" :src="cell.cover" />
          </view>
          <view class="flex flex-col justify-between">
            <view>
              <view class="text-4 line-clamp-1">{{ cell.title }}</view>
              <view class="text-3 color-gray">{{ cell.desc }}</view>
            </view>
            <view>$4999</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<style scoped lang="scss"></style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'demo-sidebar',
  },
}
</route>
