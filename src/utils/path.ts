import PLATFORM from './platform'

// 是否微信浏览器
export function isWeChatBrowser() {
  const userAgent = navigator.userAgent
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp('MicroMessenger', 'i')
  return regex.test(userAgent) // 检查用户代理中是否包含 "MicroMessenger"
}
// 是否 PC浏览器
export function isPC() {
  const userAgent = navigator.userAgent
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp('Mobi|Android|iPhone|iPad|iPod', 'i')
  const isMobile = regex.test(userAgent) // 检查是否为移动设备

  return !isMobile // 如果不是移动设备，则认为是 PC
}

export function qqHref() {
  return isPC()
    ? 'tencent://message/?uin=603660895&Site=Sambow&Menu=yes'
    : 'mqqwpa://im/chat?chat_type=wpa&uin=603660895&version=1&src_type=web'
}

/** 打开qq */
export function openQQHref() {
  if (PLATFORM.isH5 && !isWeChatBrowser()) {
    const domA = document.createElement('a')
    domA.href = qqHref()
    console.log('qqHref()', qqHref())
    alert(qqHref())
    domA.click()
  } else {
    uni.showToast({ icon: 'none', title: '不支持微信内打开', duration: 3e3 })
  }
}

/** 打开扫描 */
export function openScan() {
  if (PLATFORM.isH5) {
    const domInput = document.createElement('input')
    domInput.type = 'file'
    domInput.click()
  } else {
    uni.scanCode({
      success: (res) => {
        console.log('条码类型：' + res.scanType)
        console.log('条码内容：' + res.result)
      },
      fail: (err) => {
        console.error('扫码失败：', err)
      },
    })
  }
}

/** 分享app */
export function openAppShare() {
  openQQHref()
}
