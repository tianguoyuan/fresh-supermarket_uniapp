<script lang="ts" setup>
import { ColorEnum } from '@/enums/ColorEnum'

const tabbarList = [
  { title: '首页', icon: 'home', path: '/pages/index/index' },
  { title: '分类', icon: 'transfer', path: '/pages/kind/kind' },
  { title: '购物车', icon: 'shop', path: '/pages/shopping/shopping' },
  { title: '我的', icon: 'user', path: '/pages/user/user' },
] as const
type PathType = (typeof tabbarList)[number]['path']

const props = withDefaults(
  defineProps<{
    tabbarPath: PathType
    isPlaceholder?: boolean
    isFixed?: boolean
  }>(),
  {
    isFixed: true,
    isPlaceholder: true,
  },
)

const tabbarIndex = tabbarList.findIndex((v) => v.path === props.tabbarPath)

function pageTo(index: number) {
  const path = tabbarList[index]?.path
  if (!path) return
  uni.switchTab({ url: path })
}
</script>

<template>
  <wd-tabbar
    :model-value="tabbarIndex"
    :fixed="isFixed"
    bordered
    safe-area-inset-bottom
    :placeholder="isPlaceholder"
    :active-color="ColorEnum.MAIN_COLOR"
    @update:model-value="pageTo"
  >
    <wd-tabbar-item
      v-for="item in tabbarList"
      :key="item.title"
      :title="item.title"
      :icon="item.icon"
    />
    <!-- @click="pageTo(item.path)" -->
  </wd-tabbar>
</template>

<style lang="scss" scoped>
//
</style>
