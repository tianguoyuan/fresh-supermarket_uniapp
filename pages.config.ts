import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import path from 'node:path'
import { loadEnv } from 'vite'

// 获取环境变量的范例
const env = loadEnv(process.env.NODE_ENV!, path.resolve(process.cwd(), 'env'))
const { VITE_APP_TITLE } = env

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: VITE_APP_TITLE,
    // navigationBarBackgroundColor: '#f8f8f8',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      { pagePath: 'pages/index/index' },
      { pagePath: 'pages/kind/kind' },
      { pagePath: 'pages/shopping/shopping' },
      { pagePath: 'pages/user/user' },
    ],
  },
})
