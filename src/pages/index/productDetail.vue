<script lang="ts" setup>
import { urlDecode } from '@/utils/url'

defineOptions({
  name: 'IndexProductDetail',
})
//

onLoad((query) => {
  const id = query.id
  const back = query.back ? urlDecode(query.back) : ''
})
</script>

<template>
  <view class=""></view>
</template>

<style lang="scss" scoped>
//
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '产品详情',
  },
}
</route>
