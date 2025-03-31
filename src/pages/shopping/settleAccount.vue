<script lang="ts" setup>
import { useShoppingStore } from '@/store/shopping'
import ShoppingAddress from './components/ShoppingAddress.vue'
import { storeToRefs } from 'pinia'
import Coupon from './components/Coupon.vue'
import { useUserStore } from '@/store'
import {
  shoppingFindDefaultAddress,
  ShoppingFindDefaultAddressRes,
  shoppingGetCoupon,
} from '@/service/shopping'
import IMG_WECHAT from '../../assets/icons/wechat.svg'
import IMG_ALIPAY from '../../assets/icons/alipay.svg'
import { generateRandomIntegerString, subtract } from '@/utils/math'
import { ConfigEnum } from '@/enums/ConfigEnum'
import AddressItem from '@/components/AddressItem.vue'

defineOptions({
  name: 'ShoppingSettleAccount',
})

const userStore = useUserStore()

const initAddress = {
  id: '',
  username: '',
  phone: '',
  checked: false,
  province: '',
  city: '',
  county: '',
  suffix: '',
}

function pageBack() {
  uni.switchTab({
    url: '/pages/shopping/shopping',
  })
}
function pageToHome() {
  uni.switchTab({ url: '/pages/index/index' })
}

// 地址
const defaultAddress = ref<ShoppingFindDefaultAddressRes['defaultAddress']>({
  ...initAddress,
})
function selectAddress() {
  uni.navigateTo({
    url: '/pages/shopping/address',
  })
}

const shoppingStore = useShoppingStore()
const { checkedList, priceSum, checkedListNum } = storeToRefs(shoppingStore)
const { removeCheckedList } = shoppingStore

// 优惠券金额
const pickerValue = ref<number>(0)
const columns = ref<{ label: string; value: number }[]>([])

// 支付方式
interface IPaymentMethod {
  iconClass: string
  label: string
  active: boolean
}
const paymentMethod = ref<IPaymentMethod[]>([
  { iconClass: IMG_WECHAT, label: '微信支付', active: false },
  { iconClass: IMG_ALIPAY, label: '支付宝支付', active: true },
])
const paymentMethodActiveLabel = computed(
  () => paymentMethod.value.find((v) => v.active)?.label || '',
)
function changePaymentMethodActive(v: IPaymentMethod) {
  paymentMethod.value.forEach((item) => (item.active = false))
  v.active = true
}

// 最后支付金额
const priceSumResult = computed(() => subtract(priceSum.value, pickerValue.value))

// 订单备注
const orderRemark = ref('')
// 订单编号
const orderId = ref('')

// 弹窗
const showEditDialog = ref(false)
const anchors = ConfigEnum.floatingPanelAnchors
const height = ref(anchors[0])
function onPaySubmit() {
  const arr = [
    { label: '接收方', value: '生鲜' },
    { label: '订单编号', value: orderId.value },
    { label: '支付方式', value: paymentMethodActiveLabel.value },
    { label: '付款金额', value: priceSumResult.value },
  ]
  const queryString = encodeURIComponent(JSON.stringify(arr))

  showEditDialog.value = false
  // 删除付款商品
  removeCheckedList()
  uni.reLaunch({
    url: `/pages/shopping/paymentResult?listData=${queryString}`,
  })
}

// 提交订单
function submit() {
  orderId.value = generateRandomIntegerString(13)
  showEditDialog.value = true
}

init()
async function init() {
  shoppingFindDefaultAddress({ userId: userStore.userId }).then(({ data }) => {
    defaultAddress.value = data.defaultAddress || { ...initAddress }
  })

  shoppingGetCoupon().then(({ data }) => {
    columns.value = data.couponList
      .map((v) => ({ label: v + '', value: v }))
      .sort((a, b) => a.value - b.value)
  })
}
</script>

<template>
  <wd-navbar title="确认订单" fixed placeholder left-arrow safe-area-inset-top>
    <template #capsule>
      <wd-navbar-capsule @back="pageBack" @back-home="pageToHome" />
    </template>
  </wd-navbar>

  <!-- 地址 -->
  <view v-if="defaultAddress" class="m-3">
    <AddressItem :item="defaultAddress" @handle-click="selectAddress" />
  </view>

  <!-- 地址 -->
  <view class="m-3 rounded-2 bg-white p-3">
    <ShoppingAddress v-for="v in checkedList" :key="v.id" :item="v" />
  </view>

  <!-- 优惠券 -->
  <view class="m-3">
    <Coupon v-model:picker-value="pickerValue" :columns="columns" />
  </view>

  <!-- 支付方式 -->
  <view class="m-3 rounded-2 bg-white p-3">
    <view
      v-for="v in paymentMethod"
      :key="v.iconClass"
      class="flex items-center justify-between pt-3 first:pt-0"
      @click="changePaymentMethodActive(v)"
    >
      <view class="flex items-center">
        <view class="w-6 h-6">
          <image :src="v.iconClass" class="w-full h-full" />
        </view>
        <view class="ml-1">{{ v.label }}</view>
      </view>
      <view>
        <view class="w-4 h-4">
          <image v-if="v.active" src="../../assets/icons/radio-checked.svg" class="w-full h-full" />
          <image v-else src="../../assets/icons/radio.svg" class="w-full h-full" />
        </view>
      </view>
    </view>
  </view>

  <!-- 备注 -->
  <view class="m-3 rounded-2 bg-white overflow-hidden">
    <wd-textarea
      v-model="orderRemark"
      clearable
      show-word-limit
      label="备注"
      auto-height
      :maxlength="200"
    />
  </view>

  <!-- 底部提交按钮 -->
  <view class="pb-safe h-16 content-box" />
  <view class="fixed bottom-0 left-0 right-0 b-t b-#ececec bg-white px-3 py-4">
    <view class="pb-safe flex flex-justify-end">
      <view class="flex items-center">
        <view>共{{ checkedListNum }}件,</view>
        <view class="pl-1">合计:</view>
        <view class="pl-1 color-#F55726 flex items-end">
          <view class="text-3">￥</view>
          <view>{{ priceSumResult }}</view>
        </view>
        <view class="ml-3 rounded-full px-4 py-2 color-white bg-main" @click="submit">
          提交订单
        </view>
      </view>
    </view>
  </view>

  <wd-overlay :show="showEditDialog" :z-index="501">
    <wd-floating-panel
      v-model:height="height"
      :anchors="anchors"
      :content-draggable="false"
      safe-area-inset-bottom
    >
      <view class="relative flex justify-center items-center">
        <view class="text-4">确认付款</view>
        <view class="absolute right-3" @click="() => (showEditDialog = false)">
          <wd-icon name="close" size="16"></wd-icon>
        </view>
      </view>

      <view class="px-8">
        <view class="mt-5 text-center flex items-end justify-center">
          <view>￥</view>
          <view class="text-7 line-height-7">{{ priceSumResult }}</view>
        </view>

        <view class="mt-11 flex justify-between">
          <view class="color-#999">订单编号</view>
          <view>{{ orderId }}</view>
        </view>
        <view class="mt-7 flex justify-between">
          <view class="color-#999">付款方式</view>
          <view>{{ paymentMethodActiveLabel }}</view>
        </view>
        <view
          class="mt-13 rounded-full text-center color-#fff line-height-11 bg-main"
          @click="onPaySubmit"
        >
          立即付款
        </view>
      </view>
    </wd-floating-panel>
  </wd-overlay>
</template>

<style lang="scss" scoped>
//
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '确认订单',
  },
}
</route>
