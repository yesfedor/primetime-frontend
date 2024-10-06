<template>
  <v-btn @click="toggleWidth">{{ navigationDrawer.width }}</v-btn>
</template>

<script lang="ts">
import { useNavigationDrawer } from '@/composables/useNavigationDrawer'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppNavigationDrawerToggleWidth',
  setup() {
    const { navigationDrawer, toggleWidth } = useNavigationDrawer()
    return {
      navigationDrawer,
      toggleWidth,
    }
  },
})
</script>
