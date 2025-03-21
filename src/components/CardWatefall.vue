<script setup lang="ts">
import TnWaterFall from '@tuniao/tnui-vue3-uniapp/components/water-fall/src/water-fall.vue'

import { FindCommonRecommendListRes } from '@/service/common'
import CardWatefallItem from './CardWatefallItem.vue'

const props = defineProps<{
  list: FindCommonRecommendListRes['list']
  hideAdd?: boolean
}>()
</script>
<template>
  <view>
    <TnWaterFall :data="props.list">
      <template #left="{ item }">
        <CardWatefallItem class="mr-1.5" :item="item" />
      </template>
      <template #right="{ item }">
        <CardWatefallItem :item="item" class="ml-1.5" :hide-add="props.hideAdd" />
      </template>
    </TnWaterFall>
  </view>
</template>

<style lang="scss" scoped></style>
