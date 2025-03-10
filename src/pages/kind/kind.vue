<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->

<script lang="ts" setup>
import Tabbar from '@/components/Tabbar.vue'
import { getKindList, type kindListRes } from '@/service/kind'

defineOptions({
  name: 'Kind',
})

onLoad(() => {
  init()
})

// 侧边栏
const categories = ref<string[]>([])
// 瀑布流列表
const listData = ref([])
async function init() {
  getKindList().then(({ data: { module } }) => {
    console.log('data', module)
    categories.value = module.map((v) => v.moduleTitle)
  })
}

const active = ref(0)
function changeActive(i: number) {
  active.value = i
}
</script>
<template>
  <view id="container" class="flex flex-col">
    <view>
      <wd-navbar title="分类" fixed placeholder safe-area-inset-top>
        <!-- #ifdef MP-WEIXIN -->
        <template #left>
          <wd-icon name="share"></wd-icon>
        </template>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <template #right>
          <wd-icon name="share"></wd-icon>
        </template>
        <!-- #endif -->
      </wd-navbar>
    </view>

    <view class="flex-1 flex overflow-hidden">
      <view class="flex flex-col w-80px overflow-auto">
        <view>
          <view
            v-for="(item, index) in categories"
            :key="item"
            class="p-3 py-5 text-3 line-height-3"
            @click="changeActive(index)"
          >
            <view class="line-clamp-1">{{ item }}</view>
          </view>
        </view>
      </view>
      <view class="flex-1 bg-gray"></view>
    </view>
    <!-- 小程序tabbar不占据位置bug -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="pb-safe-tabbar"></view>
    <!-- #endif -->
    <Tabbar tabbar-path="/pages/kind/kind" :is-placeholder="false" />
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
