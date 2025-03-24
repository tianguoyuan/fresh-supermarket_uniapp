import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    function changeToken(v) {
      token.value = v
    }

    const userId = ref('')
    function changeUserId(v) {
      userId.value = v
    }

    const isLogin = computed(() => {
      return !!token.value
    })

    const userImg = ref('')
    function changeUserImg(v) {
      userImg.value = v
    }

    const userName = ref('')
    function changeUserName(v) {
      userName.value = v
    }

    const phone = ref('')
    function changeUserPhone(v) {
      phone.value = v
    }

    function clearUserInfo() {
      token.value = ''
      userId.value = ''
    }

    return {
      userImg,
      changeUserImg,

      userName,
      changeUserName,

      phone,
      changeUserPhone,

      token,
      changeToken,

      userId,
      changeUserId,
      isLogin,

      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
