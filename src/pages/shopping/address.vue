<script lang="ts" setup>
import AddressItem from '@/components/AddressItem.vue'
import { shoppingAddress, ShoppingAddressResItem } from '@/service/shopping'
import { useUserStore } from '@/store'

defineOptions({
  name: 'ShoppingAddress',
})

function pageBack() {
  uni.navigateBack()
}

const userStore = useUserStore()

const isEdit = ref(false)
function add() {}

// 地址列表
const addressList = ref([])
function removeClick(v: ShoppingAddressResItem) {
  // showDialog({
  //   message: '确定要删除该地址吗?',
  //   theme: 'round-button',
  //   showCancelButton: true,
  //   teleport: 'body',
  // }).then(() => {
  //   addressList.value = addressList.value.filter(l => l.id !== v.id)
  // })
}
function checkedClick(v: ShoppingAddressResItem) {
  addressList.value.forEach((item) => (item.checked = false))
  v.checked = !v.checked
}
function handleClick() {
  // if (route.query.noHandleClick !== '1') {
  //   router.replace('/shopping/settleAccount')
  // }
}

init()
async function init() {
  const { data: result } = await shoppingAddress({ userId: userStore.userId })
  addressList.value = (result.addressList || []).map((v, i) => ({ ...v, checked: i === 0 }))
}
</script>

<template>
  <wd-navbar title="地址管理" fixed placeholder left-arrow @click-left="pageBack" />

  <view class="p-3">
    <view class="flex justify-between text-3">
      <view>常用地址</view>
      <view class="flex">
        <view class="flex items-center" @click="isEdit = !isEdit">
          <wd-icon v-if="isEdit" color="#ee0a24" name="edit-1" size="12px"></wd-icon>
          <wd-icon v-else color="#333" name="edit-1" size="12px"></wd-icon>
          <view class="pl-2px" :class="isEdit ? 'color-#ee0a24' : 'color-#333'">
            {{ isEdit ? '完成' : '管理' }}
          </view>
        </view>
        <view class="ml-2 flex items-center" @click="add">
          <wd-icon name="add1" size="12px"></wd-icon>
          <view class="pl-2px">新增地址</view>
        </view>
      </view>
    </view>

    <AddressItem
      v-for="(v, i) in addressList"
      :key="i"
      class="mt-3"
      :item="v"
      :show-flag="isEdit ? 'editAndRemove' : 'edit'"
      @remove-click="removeClick"
      @checked-click="checkedClick"
      @handle-click="handleClick"
    />
    <!-- @right-click="rightClick" -->
    <div class="h-10" />
  </view>
</template>

<style lang="scss" scoped>
//
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '地址管理',
  },
}
</route>
