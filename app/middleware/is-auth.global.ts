export default defineNuxtRouteMiddleware((to) => {
  const authProvider = useAuth()

  if (to.meta?.isNeedAuth && !authProvider.user.isAuth) {
    if (to.name === RouteNamesEnum.watch && to.params.kpid) {
      return navigateTo({
        name: RouteNamesEnum.trailer,
        params: {
          kpid: to.params.kpid,
        },
      })
    }
  }

  if (to.meta?.access) {
    if (to.meta.access !== authProvider.user.data.access) {
      return navigateTo(getFailRoute(to))
    }
  }
})
