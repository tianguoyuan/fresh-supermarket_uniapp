<script lang="ts" setup>
//
const searchMsg = ref('')
onLoad((query) => {
  searchMsg.value = query.searchMsg || ''
})
</script>

<template>
  <view class="">
    {{ searchMsg }}
  </view>
</template>

<style lang="scss" scoped>
//
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '搜索结果',
  },
}
</route>
