<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getRect, isArray } from 'wot-design-uni/components/common/util'

const active = ref<number>(1)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const subCategories = new Array(24).fill({ title: '标题文字', label: '这是描述这是描述' }, 0, 24)
const categories = ref([
  {
    label: '分类一',
    title: '标题一',
    items: subCategories,
  },
  {
    label: '分类二',
    title: '标题二',
    items: subCategories,
  },
  {
    label: '分类三',
    title: '标题三',
    items: subCategories.slice(0, 18),
  },
  {
    label: '分类四',
    title: '标题四',
    items: subCategories.slice(0, 21),
  },
  {
    label: '分类五',
    title: '标题五',
    items: subCategories,
  },
  {
    label: '分类六',
    title: '标题六',
    items: subCategories.slice(0, 18),
  },
  {
    label: '分类七',
    title: '标题七',
    items: subCategories,
  },
])

onMounted(() => {
  getRect('.category', true).then((rects) => {
    if (isArray(rects)) {
      itemScrollTop.value = rects.map((item) => item.top || 0)
      scrollTop.value = rects[active.value].top || 0
    }
  })
})

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
  <view class="wraper">
    <wd-sidebar v-model="active" @change="handleChange">
      <wd-sidebar-item
        v-for="(item, index) in categories"
        :key="index"
        :value="index"
        :label="item.label"
      />
    </wd-sidebar>
    <scroll-view
      class="content"
      scroll-y
      scroll-with-animation
      :scroll-top="scrollTop"
      :throttle="false"
      @scroll="onScroll"
    >
      <view v-for="(item, index) in categories" :key="index" class="category">
        <wd-cell-group :title="item.title" border>
          <wd-cell
            v-for="(cell, index) in item.items"
            :key="index"
            :title="cell.title"
            :label="cell.label"
          >
            <wd-icon name="github-filled" size="24px"></wd-icon>
          </wd-cell>
        </wd-cell-group>
      </view>
    </scroll-view>
  </view>
</template>
<style scoped lang="scss">
.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}

.content {
  flex: 1;
  background: #fff;
}
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'demo-sidebar',
  },
}
</route>
