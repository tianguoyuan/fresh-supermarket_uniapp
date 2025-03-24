<script setup lang="ts">
import { ShoppingAddressResItem } from '@/service/shopping'

const props = withDefaults(
  defineProps<{
    item: ShoppingAddressResItem
    showFlag?: 'info' | 'edit' | 'remove' | 'editAndRemove'
  }>(),
  {
    showFlag: 'info',
  },
)

const emits = defineEmits<{
  handleClick: []
  removeClick: [v: typeof props.item]
  checkedClick: [v: typeof props.item]
  rightClick: [v: typeof props.item]
}>()
</script>

<template>
  <view class="rounded-2 bg-white p-3" @click="emits('handleClick')">
    <view class="flex items-center">
      <view>
        <image src="../assets/icons/address.svg" class="h-22px" mode="heightFix" />
      </view>
      <view class="flex-1 px-2">
        <view class="line-clamp-2 text-15px line-height-22px">
          {{ props.item.province + props.item.city + props.item.county + props.item.suffix }}
        </view>
        <view class="text-3 color-#999 line-height-17px flex">
          <view>{{ props.item.username }}</view>
          <view>{{ props.item.phone }}</view>
        </view>
      </view>
      <view
        v-if="['edit', 'info', 'editAndRemove'].includes(props.showFlag)"
        @click.stop="emits('rightClick', props.item)"
      >
        <image
          v-if="props.showFlag === 'edit' || props.showFlag === 'editAndRemove'"
          src="../assets/icons/edit.svg"
          class="h-14px"
          mode="heightFix"
        />

        <wd-icon v-if="props.showFlag === 'info'" name="arrow-right" color="#0B1526"></wd-icon>
      </view>
    </view>
    <view
      v-if="['remove', 'editAndRemove'].includes(props.showFlag)"
      class="mt-2 flex justify-between text-3"
    >
      <view class="flex items-center" @click.stop="emits('checkedClick', props.item)">
        <image
          v-if="item.checked"
          src="../assets/icons/radio-checked.svg"
          class="h-14px"
          mode="heightFix"
        />
        <image v-else src="../assets/icons/radio.svg" class="h-14px" mode="heightFix" />
        <view class="pl-1">默认地址</view>
      </view>
      <view class="color-#ee0a24" @click.stop="emits('removeClick', props.item)">删除</view>
    </view>
  </view>
</template>
