<script lang="ts" setup>
import { PageEnum } from '@/enums/PageEnum'
import { getUserInfo, userGetPhoneCode, userLogin } from '@/service'
import { useUserStore } from '@/store'
import { openQQHref } from '@/utils/path'
import { urlDecode } from '@/utils/url'
import { useToast } from 'wot-design-uni'
//

const userStore = useUserStore()
const { success: showSuccess } = useToast()

const model = ref({
  phone: '',
  code: '',
})

const form = ref()
const redirectUrl = ref('')

onLoad((query) => {
  console.log('query', query)
  redirectUrl.value = urlDecode(query.redirect)
  console.log('redirectUrl.value', redirectUrl.value)
})

function handleSubmit() {
  form.value
    .validate()
    .then(async ({ valid, errors }) => {
      if (!valid) return
      const loginResult = await userLogin({
        phone: model.value.phone,
        code: model.value.code,
      })
      const infoResult = await getUserInfo({
        token: loginResult.data.token,
      })
      userStore.changeToken(loginResult.data.token)
      userStore.changeUserId(loginResult.data.userId)

      userStore.changeUserImg(infoResult.data.img)
      userStore.changeUserName(infoResult.data.name)
      userStore.changeUserPhone(infoResult.data.phone)

      if (redirectUrl.value) {
        const pushType = PageEnum.TABBAR_PAGE_LIST.includes(redirectUrl.value)
          ? 'switchTab'
          : 'redirectTo'
        uni[pushType]({
          url: redirectUrl.value,
        })
      } else {
        uni.switchTab({
          url: '/pages/index/index',
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

const time = ref(0)
const timeInstance = ref()
function sendCode() {
  console.log('sendCode')

  form.value.validate(['phone']).then(({ valid }) => {
    if (valid) {
      userGetPhoneCode({ phone: model.value.phone }).then(({ data }) => {
        console.log('data', data)
        model.value.code = data.code
        time.value = 10
        timeInstance.value = setInterval(() => {
          if (time.value <= 0) {
            clearInterval(timeInstance.value)
          } else {
            time.value--
          }
        }, 1000)
      })
    }
  })
}

function toDashboard() {
  uni.redirectTo({
    url: '/pages/dashboard',
  })
}
function toRegister() {
  const query = redirectUrl.value ? `?redirect=${redirectUrl.value}` : ''
  uni.redirectTo({
    url: `/pages/user/register` + query,
  })
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
  <view id="container" class="login flex flex-col justify-between bg-#fff">
    <wd-navbar title="" fixed placeholder safe-area-inset-top>
      <template #left>
        <wd-icon name="home1" @click="toDashboard"></wd-icon>
      </template>
    </wd-navbar>
    <view class="flex-1 px-7">
      <view class="mt-10 text-6">手机号码登录</view>
      <view class="h-10"></view>
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input
            v-model="model.phone"
            label="手机号"
            label-width="100px"
            prop="phone"
            clearable
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <wd-input
            v-model="model.code"
            label="验证码"
            label-width="100px"
            prop="code"
            clearable
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          />
          <view class="text-right py-3">
            <wd-text
              :type="time !== 0 ? 'default' : 'primary'"
              :text="'发送验证码' + (time !== 0 ? ' ' + time : '')"
              @click="sendCode"
            ></wd-text>
          </view>
        </wd-cell-group>
        <view class="footer">
          <view
            class="h-11 rounded-full bg-#40AE36 text-center color-white line-height-11"
            @click="handleSubmit"
          >
            提交
          </view>
        </view>
      </wd-form>

      <view class="mt5 block color-[#666262] flex items-center justify-center">
        <view @click="toRegister">新用户注册</view>
        <wd-icon name="arrow-right" size="16px"></wd-icon>
      </view>
    </view>

    <view class="color-[#666262] pb-10">
      <view class="text-center">其它登录方式</view>
      <view class="mt-5 flex justify-evenly px-5">
        <image class="w-53px h-53px" src="../../assets/icons/wechat.svg" @click="openQQHref" />
        <image class="w-53px h-53px" src="../../assets/icons/qq.svg" @click="openQQHref" />
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
//
.login {
  :deep(.wd-input) {
    padding-right: 0;
    padding-left: 0;
  }
  :deep(.wd-input:nth-of-type(2)::before) {
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
}
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '用户-登录',
    navigationStyle: 'custom',
  },
}
</route>
