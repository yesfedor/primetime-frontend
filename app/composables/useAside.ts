export function useAside() {
  const isShow = useState<boolean>('aside:isShow', () => false)
  const breakpoint = useBreakpoint()
  const documentScrollLock = useDocumentScrollLock()

  function show() {
    if (breakpoint.value.isDesktop) {
      return
    }
    documentScrollLock?.lock()
    isShow.value = true
  }

  function close() {
    if (breakpoint.value.isDesktop) {
      return
    }
    documentScrollLock?.unlock()
    isShow.value = false
  }

  function toggle() {
    if (isShow.value) {
      close()
      return
    }
    show()
  }

  const iconName = computed(() => isShow.value ? 'jam:close' : 'jam:align-justify')

  const { width } = useSSRWindowSize()
  watch(width, () => {
    if (isShow.value) {
      close()
    }
  })

  return {
    isShow,
    iconName,
    show,
    close,
    toggle,
  }
}
