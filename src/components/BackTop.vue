<script lang="ts" setup>
const scrollTop = ref<number>(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>

<template>
  <wd-backtop :scroll-top="scrollTop"></wd-backtop>
</template>

<style lang="scss" scoped>
//
</style>
