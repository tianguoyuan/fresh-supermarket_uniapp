import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'app',
  () => {
    const systemScreenHeight = ref(0)

    function changeSystemScreenHeight(v: number) {
      systemScreenHeight.value = v
    }
    return {
      systemScreenHeight,
      changeSystemScreenHeight,
    }
  },
  {
    persist: true,
  },
)
