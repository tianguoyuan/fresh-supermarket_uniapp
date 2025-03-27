<script setup lang="ts">
import { TnWaterFall } from '@tuniao/tnui-vue3-uniapp'
import CardWaterfallItem from './CardWaterfallItem.vue'
import type { FindCommonRecommendListRes } from '@/service/common'

const props = defineProps<{
  list: FindCommonRecommendListRes['list']
  hideAdd?: boolean
}>()
</script>
<template>
  <view>
    <TnWaterFall :data="props.list">
      <template #left="{ item }">
        <view :key="item.id" class="pr-1.5">
          <CardWaterfallItem :item="item" :hide-add="props.hideAdd" />
        </view>
      </template>
      <template #right="{ item }">
        <view :key="item.id" class="pl-1.5">
          <CardWaterfallItem :item="item" :hide-add="props.hideAdd" />
        </view>
      </template>
    </TnWaterFall>
  </view>
</template>

<style lang="scss" scoped></style>
