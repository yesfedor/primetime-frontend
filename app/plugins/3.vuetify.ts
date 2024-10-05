import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as componentsLabs from 'vuetify/labs/components'

import { darkTheme } from '~/plugins/vuetify/dark'
import { lightTheme } from '~/plugins/vuetify/light'

export default defineNuxtPlugin({
  name: 'ui:vuetify',

  async setup(nuxtApp) {
    const vuetify = createVuetify({
      ssr: true,
      blueprint: md3,
      display: {
        mobileBreakpoint: 'sm',
      },
      defaults: {
        global: {
          elevation: 0,
          flat: true,
        },
      },
      theme: {
        defaultTheme: AppThemesEnum.dark,
        themes: {
          lightTheme,
          darkTheme,
        },
      },
      icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
          fa,
        },
      },
      components: {
        ...components,
        ...componentsLabs,
      },
      directives,
    })
    nuxtApp.vueApp.use(vuetify)
  },
})
