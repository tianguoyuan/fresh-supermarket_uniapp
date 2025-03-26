<script lang="ts" setup>
import { ref } from 'vue'
import { getRect, isArray } from 'wot-design-uni/components/common/util'
import { type kindListRes } from '@/service/kind'
import ListRow from './ListRow.vue'
import { debounce } from 'throttle-debounce'
import PLATFORM from '@/utils/platform'

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const props = defineProps<{
  listData: kindListRes['module']
}>()

const listRowRef = ref<InstanceType<typeof ListRow> | null>(null)

onMounted(() => {
  setTimeout(() => {
    getRect('.category', true, listRowRef.value.instance.proxy).then((rects) => {
      if (!isArray(rects)) return
      itemScrollTop.value = rects.map((item) => item.top)
    })
  }, 1000)
})

function handleChange({ value }) {
  active.value = value
  scrollTop.value = itemScrollTop.value[value] - 55
}

function onScroll(e) {
  const { scrollTop: elTop } = e.detail
  const index = itemScrollTop.value.findIndex((top) => top > elTop)
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
    addGlobalClass: true,
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
        custom-style="font-size: 12px;color: #40ae36;white-space: nowrap;"
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
      <ListRow ref="listRowRef" :list-data="props.listData" />

      <view
        v-show="scrollTop > 300"
        class="fixed bottom-100px right-20px z-10 w-40px h-40px"
        @click="toTop"
      >
        <wd-backtop
          :scroll-top="scrollTop"
          :top="300"
          custom-style="color: #fff !important;background-color: #40ae36 !important;"
        ></wd-backtop>
      </view>
    </scroll-view>
  </view>
</template>
<style lang="scss">
#SidebarComponent {
  .sidebarItem {
    font-size: 12px;
    color: #40ae36;
    white-space: nowrap;
    &::before {
      background-color: #40ae36;
    }
  }
  .wd-badge {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
