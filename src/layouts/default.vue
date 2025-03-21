<script lang="ts" setup>
import BackTop from '@/components/BackTop.vue'
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <wd-toast />
    <wd-message-box />

    <BackTop custom-style="background-color:#4d80f0; color:#fff;" />
  </wd-config-provider>
</template>
