<template>
  <v-btn
    icon
    color="transparent"
    @click="toggleTheme"
  >
    <v-icon color="primary">{{ iconName }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useTheme } from 'vuetify'

export default defineComponent({
  name: 'AppThemeToggle',
  setup() {
    const theme = useTheme()
    const iconName = computed(() => theme.global.current.value.dark ? 'mdi-weather-sunset-up' : 'mdi-weather-sunset-down')
    return {
      iconName,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? AppThemesEnum.light : AppThemesEnum.dark,
    }
  },
})
</script>
