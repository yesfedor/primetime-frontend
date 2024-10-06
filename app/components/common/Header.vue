<template>
  <v-app-bar
    :height="56"
    flat
    app
  >
    <AppNavigationToggle />

    <v-app-bar-title>
      <AppLogo />
    </v-app-bar-title>

    <template #append>
      <AppHeaderMenu />
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import AppHeaderMenu from '@/components/common/HeaderMenu.vue'
import AppLogo from '@/components/common/Logo.vue'
import AppNavigationToggle from '@/components/navigation/Toggle.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeader',
  components: {
    AppNavigationToggle,
    AppLogo,
    AppHeaderMenu,
  },
})
</script>
