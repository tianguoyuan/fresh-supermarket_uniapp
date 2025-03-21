<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    listData: {
      img?: string
      iconClass?: string
      func?: () => void
      name: string
      active?: boolean
    }[]
    title: string
    rightTitle?: string
    iconHeight?: number
  }>(),
  {
    iconHeight: 20,
  },
)
const emits = defineEmits<{
  onRightClick: []
  onHandleClick: [i: number]
}>()
</script>

<template>
  <view class="mx-3 rounded-3 bg-white p-4">
    <view class="flex justify-between">
      <view>{{ title }}</view>
      <view v-if="props.rightTitle" class="flex items-center" @click="emits('onRightClick')">
        <view>{{ props.rightTitle }}</view>
        <wd-icon name="arrow-right" size="14px"></wd-icon>
      </view>
    </view>

    <view class="mt-5 flex">
      <view
        v-for="(item, index) in props.listData"
        :key="item.name"
        class="relative flex flex-1 flex-col items-center justify-center"
        @click="emits('onHandleClick', index)"
      >
        <view v-if="item.img" :style="{ height: `${iconHeight}px` }">
          <image class="h-full" :src="item.img" alt="" />
        </view>
        <view v-else-if="item.iconClass">
          <!-- <wd-icon name="arrow-right" :size="iconHeight + 'px'"></wd-icon> -->
          <image class="h-3" :style="{ height: iconHeight } + 'px'" :src="item.iconClass" />
        </view>
        <view class="line-clamp-1 mt-2 color-[#666]">
          {{ item.name }}
        </view>
        <view v-if="item.active" class="absolute right-2.5 top-0 h-2 w-2 rounded-full bg-red" />
      </view>
    </view>
  </view>
</template>

<style scoped></style>
