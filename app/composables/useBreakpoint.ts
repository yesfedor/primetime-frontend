export function useBreakpoint() {
  const { width } = useSSRWindowSize()

  const flags = computed(() => {
    return {
      isMobile: width.value < 768,
      isTablet: width.value >= 768 && width.value < 1200,
      isDesktop: width.value >= 1200,
    }
  })

  return flags
}
