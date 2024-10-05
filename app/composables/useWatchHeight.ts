import { computed } from 'vue'

export function useWatchHeight() {
  const route = useRoute()
  const height = computed(() => route.name === RouteNamesEnum.watch ? '200px' : '260px')
  return {
    height,
  }
}
