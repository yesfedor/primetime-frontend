<script lang="ts" setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
const loadingColor = computed(() => {
  return theme.global.current.value.dark ? '#fff' : '#000'
})
</script>

<template>
  <section class="app-common-scope">
    <nuxt-loading-indicator
      :throttle="0"
      :duration="5e3"
      :color="loadingColor"
    />
  </section>
</template>
