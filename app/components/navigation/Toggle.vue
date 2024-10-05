<template>
  <v-app-bar-nav-icon
    v-if="!$vuetify.display.mobile"
    @click="toggleWidth"
  />
</template>

<script lang="ts">
import { useNavigationDrawer } from '@/composables/useNavigationDrawer'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppNavigationToggle',
  setup() {
    const { navigationDrawer, toggleWidth } = useNavigationDrawer()
    return {
      navigationDrawer,
      toggleWidth,
    }
  },
})
</script>
