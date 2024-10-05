export default defineNuxtPlugin({
  name: 'app:authService',

  async setup() {
    const $auth = createAuthService()

    $auth.Api.install({
      appId: 1,
    })

    await $auth.Api.created()

    if (import.meta.client) {
      $auth.Api.mounted()
    }

    return {
      provide: {
        auth: $auth.Api,
      },
    }
  },
})
