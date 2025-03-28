<script setup lang="ts">
import TnWaterFall from '@tuniao/tnui-vue3-uniapp/components/water-fall/src/water-fall.vue'
import CardWaterfallItem from './CardWaterfallItem.vue'
import type { FindCommonRecommendListRes } from '@/service/common'

const props = defineProps<{
  list: FindCommonRecommendListRes['list']
  hideAdd?: boolean
}>()
</script>
<template>
  <view>
    <TnWaterFall :data="props.list" mode="calc">
      <template #left="{ item }">
        <view class="pr-1.5">
          <CardWaterfallItem :item="item" :hide-add="props.hideAdd" />
        </view>
      </template>
      <template #right="{ item }">
        <view class="pl-1.5">
          <CardWaterfallItem :item="item" :hide-add="props.hideAdd" />
        </view>
      </template>
    </TnWaterFall>
  </view>
</template>

<style lang="scss" scoped></style>
