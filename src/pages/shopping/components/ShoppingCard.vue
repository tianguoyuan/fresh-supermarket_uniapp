<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useShoppingStore } from '@/store/shopping'
import type { FindCommonRecommendListRes } from '@/service/common'
import { urlEncode } from '@/utils/url'
import CardList from '@/components/CardList.vue'

const shoppingStore = useShoppingStore()
const { shoppingList } = storeToRefs(shoppingStore)
const { addShoppingList, subtractShoppingList, changeCheckedList } = shoppingStore

function pageToProductDetail(item: FindCommonRecommendListRes['list'][0]) {
  const pages = getCurrentPages()
  const path = '/' + pages[pages.length - 1].route
  uni.navigateTo({
    url: `/pages/index/productDetail?id=${item.id}&back=${urlEncode(path)}`,
  })
}
</script>

<template>
  <CardList :list="shoppingList" flag="shopping" />
</template>

<style scoped lang="scss"></style>
