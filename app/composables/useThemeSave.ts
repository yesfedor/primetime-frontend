import { onMounted, watch } from 'vue'
import { useTheme } from 'vuetify'

export function useThemeSave() {
  const theme = useTheme()
  const savedTheme = useCookie<string>('theme-saved', {
    default() {
      return AppThemesEnum.dark
    },
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  watch(theme.name, (themeName) => {
    savedTheme.value = themeName
  })

  onMounted(() => {
    if (theme.name.value !== savedTheme.value) {
      theme.global.name.value = savedTheme.value
    }
  })
}
