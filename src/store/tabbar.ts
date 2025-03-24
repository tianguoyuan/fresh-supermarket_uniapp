import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabbarStore = defineStore('tabbar', () => {
  const hideTabbar = ref(false)
  function changeHideTabbar(v: boolean) {
    hideTabbar.value = v
  }

  return {
    hideTabbar,
    changeHideTabbar,
  }
})
