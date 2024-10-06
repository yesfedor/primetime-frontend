import Toast, { type PluginOptions } from 'vue-toastification'

export default defineNuxtPlugin({
  name: 'ui:vue-toastification',

  async setup(nuxtApp) {
    const options: PluginOptions = {
      maxToasts: 8,
      position: 'top-right',
      shareAppContext: true,
      timeout: 2000,
      transition: 'Vue-Toastification__fade',
    }
    nuxtApp.vueApp.use(Toast, options)
  },
})
