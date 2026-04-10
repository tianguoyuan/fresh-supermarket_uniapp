<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { navigateToInterceptor } from './interceptors/route'
import { useAppStore } from './store/app'

const appStore = useAppStore()

function setAppInfo(options: { path: string }) {
  navigateToInterceptor.invoke({ url: '/' + options.path })
  const windowInfo = uni.getWindowInfo()
  console.log('屏幕高度：', windowInfo.screenHeight)
  appStore.changeSystemScreenHeight(windowInfo.screenHeight)
}
onLaunch((options) => {
  console.log('App Launch', options)
  // 首次进入判断页面是否需要登录
  if (!options) return
  setAppInfo(options)
  // #ifndef MP
  window.addEventListener('resize', () => setAppInfo(options))
  // #endif
})
onReady(() => {})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
// 微信 tabbar.custom隐藏， h5单独设置
// #ifndef MP
.uni-tabbar-bottom {
  display: none;
}
$appMaxWidth: 500px;
// 大于$appMaxWidth
@media (min-width: $appMaxWidth) {
  page {
    position: relative;
    max-width: $appMaxWidth; /* 设计稿宽度 */
    min-height: 100%;
    margin: 0 auto;
    background: #fff;
  }
  .tn-navbar,
  .tn-tabbar {
    right: 0;
    left: 0;
    max-width: $appMaxWidth; /* 设计稿宽度 */
    margin: auto;
  }
  .uni-page-head {
    width: $appMaxWidth;
    margin: auto;
  }
  html {
    font-size: 20px !important;
  }
  html,
  body {
    overflow: auto;
    background: #ddd;
  }
}
// 小于300px
@media (max-width: 300px) {
  html {
    font-size: 12px !important;
  }
}
// #endif
</style>
