<!-- 优惠券 -->
<script setup lang="ts">
const props = defineProps<{
  pickerValue: number
  columns: { label: string; value: number }[]
}>()
const emits = defineEmits<{
  'update:pickerValue': number
}>()

const showPicker = ref(false)

function confirm({ value }) {
  emits('update:pickerValue', value as number)
  showPicker.value = false
}
</script>

<template>
  <wd-picker
    :model-value="props.pickerValue"
    :columns="columns"
    use-default-slot
    :close-on-click-modal="false"
    @confirm="confirm"
  >
    <view class="flex justify-between rounded-8px bg-white p-3 py-4" @click="showPicker = true">
      <view>优惠券</view>
      <view class="flex items-center">
        <view v-if="props.pickerValue">
          <view class="color-#F55726 flex items-end">
            <view class="text-3 mr-2">￥</view>
            <view>-</view>
            <view>{{ pickerValue }}</view>
          </view>
        </view>
        <view v-else class="color-#999">请选择</view>
        <view class="pr-1"></view>
        <wd-icon name="arrow-right"></wd-icon>
      </view>
    </view>
  </wd-picker>
</template>

<style scoped lang="scss"></style>
