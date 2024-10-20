<script setup lang="ts">
import AppHeader from '~/components/common/Header.vue'
import AppNavigationBottom from '~/components/navigation/Bottom.vue'
import AppNavigationDrawer from '~/components/navigation/Drawer.vue'
</script>

<template>
  <layout-provider>
    <v-app>
      <AppHeader />

      <AppNavigationDrawer />

      <v-main>
        <slot />
      </v-main>

      <AppNavigationBottom />
    </v-app>
  </layout-provider>
</template>
