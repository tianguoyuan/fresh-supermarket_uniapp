<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->

<script lang="ts" setup>
import Tabbar from '@/components/Tabbar.vue'
import { getKindList, type kindListRes } from '@/service/kind'
import SidebarList from '@/components/SidebarList.vue'
import PLATFORM from '@/utils/platform'
import { openAppShare } from '@/utils/path'

defineOptions({
  name: 'Kind',
})

onLoad(() => {
  if (PLATFORM.isApp) uni.hideTabBar()

  init()
})

// 侧边栏
const categories = ref<string[]>([])
// 瀑布流列表
const listData = ref<kindListRes['module']>([])
async function init() {
  getKindList().then(({ data: { module } }) => {
    console.log('data', module)
    categories.value = module.map((v) => v.moduleTitle)
    listData.value = module
  })
}

const active = ref(0)
function changeActive(i: number) {
  active.value = i
}
// 瀑布流
const column = ref(3)
const columnChange = ref(false)
function changeColumn(h) {
  column.value = !h ? column.value - 1 : column.value + 1
  if (column.value > 5) return (column.value = 5)
  if (column.value < 2) return (column.value = 2)
  columnChange.value = true
  setTimeout(() => {
    columnChange.value = false
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
  <view id="container" class="flex flex-col">
    <view>
      <wd-navbar title="分类" fixed placeholder safe-area-inset-top>
        <!-- #ifdef MP-WEIXIN -->
        <template #left>
          <wd-icon name="share" @click="openAppShare"></wd-icon>
        </template>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <template #right>
          <wd-icon name="share" @click="openAppShare"></wd-icon>
        </template>
        <!-- #endif -->
      </wd-navbar>
    </view>

    <view v-if="listData" class="flex-1 flex overflow-hidden">
      <view class="overflow-auto w-full">
        <SidebarList :list-data="listData" />
      </view>
    </view>
    <!-- 小程序tabbar不占据位置bug -->
    <!-- #ifdef MP-WEIXIN -->
    <!-- <view class="pb-safe-tabbar"></view> -->
    <!-- #endif -->
    <Tabbar tabbar-path="/pages/kind/kind" />
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '分类',
  },
}
</route>
