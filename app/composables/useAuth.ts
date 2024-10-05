export function useAuth() {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$auth
}

export function useUser() {
  return useAuth().user
}
