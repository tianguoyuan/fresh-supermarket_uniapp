<script lang="ts" setup>
import { ref } from 'vue'
import { getRect, isArray } from 'wot-design-uni/components/common/util'
import { type kindListRes } from '@/service/kind'
import ListRow from './ListRow.vue'

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const props = defineProps<{
  listData: kindListRes['module']
}>()

watch(
  () => props.listData,
  async (v) => {
    if (!props.listData.length) return
    await nextTick()
    setTimeout(() => {
      getRect('.category', true).then((rects) => {
        console.log('rects', rects)

        if (isArray(rects)) {
          itemScrollTop.value = rects.map((item) => (item.top ? item.top - 50 : 0))
          scrollTop.value = 0
          // scrollTop.value = rects[active.value].top ? rects[active.value].top - 50 : 0
        }
      })
    }, 1000)
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
  const { scrollTop: elTop } = e.detail
  // scrollTop.value = +elTop
  const threshold = 50 // 下一个标题与顶部的距离
  if (elTop < threshold) {
    active.value = 0
    return
  }
  const index = itemScrollTop.value.findIndex((top) => top > elTop && top - elTop <= threshold)
  if (index > -1) {
    active.value = index
  }
}

function toTop() {
  scrollTop.value = 0
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
  <view id="SidebarComponent" class="h-full flex">
    <wd-sidebar v-model="active" @change="handleChange">
      <wd-sidebar-item
        v-for="(item, index) in props.listData"
        :key="index"
        :value="index"
        :label="item.moduleTitle"
        custom-class="sidebarItem"
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
      <ListRow :list-data="props.listData" />

      <wd-backtop :scroll-top="scrollTop" custom-class="topIcon" @click="toTop"></wd-backtop>
    </scroll-view>
  </view>
</template>
<style lang="scss">
.sidebarItem {
  font-size: 12px;
  color: #40ae36;
  white-space: nowrap;
  &::before {
    background-color: #40ae36;
  }
}
#SidebarComponent {
  .wd-badge {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.topIcon {
  color: #fff !important;
  background-color: #40ae36 !important;
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
