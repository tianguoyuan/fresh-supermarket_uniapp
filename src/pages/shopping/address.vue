<script lang="ts" setup>
import AddressItem from '@/components/AddressItem.vue'
import { ConfigEnum } from '@/enums/ConfigEnum'
import { shoppingAddress, ShoppingAddressResItem } from '@/service/shopping'
import { useUserStore } from '@/store'
import { useMessage } from 'wot-design-uni'
import TnRegionPicker from '@tuniao/tnui-vue3-uniapp/components/region-picker/src/region-picker.vue'
import { uuid } from 'wot-design-uni/components/common/util'
import { PageEnum } from '@/enums/PageEnum'
import { urlDecode } from '@/utils/url'

const message = useMessage()

defineOptions({
  name: 'ShoppingAddress',
})
const pathParams = ref<{ back: string; noHandleClick: '' | '1' }>({
  back: '',
  noHandleClick: '',
})
onLoad((query) => {
  console.log('shopping-address: onLoad-query', query)

  pathParams.value.back = query.back ? urlDecode(query.back) : ''
  pathParams.value.noHandleClick = query.noHandleClick ? query.noHandleClick : ''
})

function pageBack() {
  if (pathParams.value.back) {
    const pushType = PageEnum.TABBAR_PAGE_LIST.includes(pathParams.value.back.split('?')?.[0])
      ? 'switchTab'
      : 'redirectTo'
    uni[pushType]({
      url: pathParams.value.back,
    })
  } else {
    uni.switchTab({
      url: '/pages/user/user',
    })
  }
}

const userStore = useUserStore()
const isEdit = ref(false)
// 地址列表
const addressList = ref([])
function removeClick(v: ShoppingAddressResItem) {
  message
    .confirm({
      msg: '确定要删除该地址吗',
      title: '提示',
      closeOnClickModal: false,
    })
    .then(() => {
      addressList.value = addressList.value.filter((l) => l.id !== v.id)
    })
}
function checkedClick(v: ShoppingAddressResItem) {
  addressList.value.forEach((item) => (item.checked = false))
  v.checked = !v.checked
}

function handleClick() {
  if (pathParams.value.noHandleClick !== '1') {
    uni.redirectTo({
      url: '/pages/shopping/settleAccount',
    })
  }
}

// 新增编辑弹窗
const anchors = ConfigEnum.floatingPanelAnchors
const height = ref(anchors[2])
const model = ref({
  province: '',
  city: '',
  county: '',
  suffix: '',
  username: '',
  phone: '',
})

const form = ref()
const show = ref(false)
const currentAddressId = ref('')
const openRegionPicker = ref(false)
const regionValue = ref<string[]>([])

function handleSubmit() {
  console.log('currentAddressId.value', currentAddressId.value)
  form.value.validate().then(({ valid, errors }) => {
    if (!valid) return

    if (currentAddressId.value) {
      const currentItem = addressList.value.find((v) => v.id === currentAddressId.value)
      if (currentItem) {
        currentItem.province = model.value.province
        currentItem.city = model.value.city
        currentItem.county = model.value.county
        currentItem.suffix = model.value.suffix
        currentItem.username = model.value.username
        currentItem.phone = model.value.phone
      }
    } else {
      addressList.value.unshift({
        ...model.value,
        id: uuid(), // 修改新创建地址 变成新增 bug
      })
    }

    show.value = false
  })
}
function handleCancel() {
  form.value.reset()
  nextTick(() => {
    show.value = false
  })
}

function rightClick(v: ShoppingAddressResItem) {
  model.value.province = v.province
  model.value.city = v.city
  model.value.county = v.county
  model.value.suffix = v.suffix
  model.value.username = v.username
  model.value.phone = v.phone
  currentAddressId.value = v.id

  show.value = true
}
function add() {
  model.value.province = ''
  model.value.city = ''
  model.value.county = ''
  model.value.suffix = ''
  model.value.username = ''
  model.value.phone = ''
  currentAddressId.value = ''

  show.value = true
}

function pickerConfirm(v, list) {
  model.value.province = list[0].name
  model.value.city = list[1].name
  model.value.county = list[2].name
}

init()
async function init() {
  const { data: result } = await shoppingAddress({ userId: userStore.userId })
  addressList.value = (result.addressList || []).map((v, i) => ({ ...v, checked: i === 0 }))
}
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared', // 解除样式隔离
  },
}
</script>

<template>
  <wd-navbar
    title="地址管理"
    fixed
    placeholder
    left-arrow
    safe-area-inset-top
    @click-left="pageBack"
  />

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

    <view v-for="(v, i) in addressList" :key="i" class="mt-3">
      <AddressItem
        :item="v"
        :show-flag="isEdit ? 'editAndRemove' : 'edit'"
        @remove-click="removeClick"
        @checked-click="checkedClick"
        @right-click="rightClick"
        @handle-click="handleClick"
      />
    </view>
    <view class="h-10" />

    <view>
      <wd-overlay :show="show" :z-index="501">
        <wd-floating-panel
          v-model:height="height"
          :anchors="anchors"
          :content-draggable="false"
          safe-area-inset-bottom
        >
          <wd-form ref="form" :model="model">
            <view class="px-3">
              <wd-cell-group border>
                <view @click="() => (openRegionPicker = true)">
                  <wd-input
                    :model-value="
                      model.province ? model.province + '-' + model.city + '-' + model.county : ''
                    "
                    label="所在地区"
                    label-width="100px"
                    prop="province"
                    clearable
                    readonly
                    placeholder="请填写所在地区"
                    :rules="[{ required: true, message: '请填写所在地区' }]"
                  />
                </view>
                <TnRegionPicker
                  v-model="regionValue"
                  v-model:open="openRegionPicker"
                  :mask="true"
                  @confirm="pickerConfirm"
                />

                <wd-input
                  v-model="model.suffix"
                  label="详细地址"
                  label-width="100px"
                  prop="suffix"
                  clearable
                  placeholder="请填写详细地址"
                  :rules="[{ required: true, message: '请填写详细地址' }]"
                />
                <wd-input
                  v-model="model.username"
                  label="姓名"
                  label-width="100px"
                  prop="username"
                  clearable
                  placeholder="请填写姓名"
                  :rules="[{ required: true, message: '请填写姓名' }]"
                />
                <wd-input
                  v-model="model.phone"
                  label="手机号"
                  label-width="100px"
                  prop="phone"
                  clearable
                  placeholder="请填写手机号"
                  :rules="[{ required: true, message: '请填写手机号' }]"
                />
              </wd-cell-group>
              <view class="mt-3 flex">
                <view
                  class="h-10 flex-1 bg-white border-#dcdee0 border-1 border-solid rounded-full flex items-center justify-center mr-3"
                  @click="handleCancel"
                >
                  取消
                </view>
                <view
                  class="h-10 flex-1 bg-#1989fa color-white border-#1989fa border-solid rounded-full flex items-center justify-center"
                  @click="handleSubmit"
                >
                  提交
                </view>
              </view>
            </view>
          </wd-form>
        </wd-floating-panel>
      </wd-overlay>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-input:nth-of-type(4)::before) {
  position: absolute;
  bottom: 0;
  left: var(--wot-input-cell-padding, 10px);
  display: block;
  width: calc(100% - var(--wot-input-cell-padding, 10px));
  height: 1px;
  content: '';
  background: #e8e8e8;
  transform: scaleY(0.5);
}
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
