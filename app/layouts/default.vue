<script setup lang="ts">
import AppHeader from '~/components/common/Header.vue'
import AppNavigationBottom from '~/components/navigation/Bottom.vue'
import AppNavigationDrawer from '~/components/navigation/Drawer.vue'
</script>

<template>
  <layout-provider>
    <v-app>
      <client-only>
        <AppHeader />
        <AppNavigationDrawer />
      </client-only>
      <v-main>
        <slot />
      </v-main>

      <client-only>
        <AppNavigationBottom />
      </client-only>
    </v-app>
  </layout-provider>
</template>
