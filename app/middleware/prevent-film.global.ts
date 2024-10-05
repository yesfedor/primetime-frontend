export default defineNuxtRouteMiddleware((to) => {
  if (to.name === RouteNamesEnum.film && to.params.kpid) {
    return navigateTo({
      name: RouteNamesEnum.watch,
      params: {
        kpid: to.params.kpid,
      },
    })
  }
})
