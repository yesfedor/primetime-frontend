import { useScrollLock } from '@vueuse/core'

export function useDocumentScrollLock() {
  if (import.meta.server) {
    return
  }

  const isLocked = useScrollLock(document)

  function lock() {
    isLocked.value = true
  }

  function unlock() {
    isLocked.value = false
  }

  onBeforeUnmount(() => {
    unlock()
  })

  return {
    isLocked,
    lock,
    unlock,
  }
}
