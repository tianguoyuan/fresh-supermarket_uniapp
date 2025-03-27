import { defineStore } from 'pinia'
import { add, multiply } from '@/utils/math'
import type { CommonRecommendListItem, FindCommonRecommendListRes } from '@/service/common'

export const useShoppingStore = defineStore('shopping', () => {
  const shoppingList = ref<FindCommonRecommendListRes['list']>(
    JSON.parse(uni.getStorageSync('shoppingList') || null) || [],
  )
  watch(
    shoppingList,
    () => {
      uni.setStorageSync('shoppingList', JSON.stringify(shoppingList.value || []))
    },
    {
      deep: true,
    },
  )

  /** 所有选中的 */
  const checkedList = computed(() => shoppingList.value.filter((v) => v.checked))
  const priceSum = computed(
    () => checkedList.value.reduce((pre, cur) => add(pre, multiply(+cur.price, cur.num)), 0) || 0,
  )
  const checkedListNum = computed(
    () => checkedList.value.reduce((pre, cur) => add(pre, +cur.num), 0) || 0,
  )

  const isAllChecked = computed(
    () => shoppingList.value.length && shoppingList.value.every((v) => v.checked),
  )
  function changeAllCheckedList() {
    const is = isAllChecked.value
    shoppingList.value.forEach((v) => (v.checked = !is))
  }

  function changeCheckedList(val: CommonRecommendListItem) {
    const findItemIndex = shoppingList.value.findIndex((v) => v.id === val.id)
    const currentItem = shoppingList.value[findItemIndex]
    if (findItemIndex !== -1) {
      currentItem.checked = !currentItem.checked
    }
  }
  async function removeCheckedList() {
    shoppingList.value = shoppingList.value.filter((v) => !v.checked)
  }

  function addShoppingList(val: CommonRecommendListItem, tip?: boolean) {
    if (tip) {
      uni.showToast({
        icon: 'none',
        title: '添加成功',
      })
    }

    const findItemIndex = shoppingList.value.findIndex((v) => v.id === val.id)
    const currentItem = shoppingList.value[findItemIndex]
    if (findItemIndex !== -1) {
      currentItem.num += 1
    } else {
      shoppingList.value.push({ ...val, num: 1 })
    }
  }
  function subtractShoppingList(val: CommonRecommendListItem) {
    const findItemIndex = shoppingList.value.findIndex((v) => v.id === val.id)
    const currentItem = shoppingList.value[findItemIndex]
    if (findItemIndex !== -1 && currentItem.num <= 1) {
      shoppingList.value.splice(findItemIndex, 1)
    } else {
      currentItem.num -= 1
    }
  }
  return {
    isAllChecked,
    changeAllCheckedList,

    shoppingList,
    priceSum,
    checkedList,
    checkedListNum,

    addShoppingList,
    subtractShoppingList,

    changeCheckedList,
    removeCheckedList,
  }
})
