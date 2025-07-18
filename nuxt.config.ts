import { defineNuxtConfig } from 'nuxt/config'

import experimentalConfig from './configs/experimental.config'
import headConfig from './configs/head.config'
import pwaConfig from './configs/pwa.config'
import viteConfig from './configs/vite.config'

export default defineNuxtConfig({
  // https://nuxt.com/docs/api/configuration/nuxt-config

  modules: [
    // https://eslint.nuxt.com/packages/module
    '@nuxt/eslint',
    // https://nuxt.com/modules/stylelint
    '@nuxtjs/stylelint-module',
    // https://nuxt.com/modules/pinia
    '@pinia/nuxt',
    // https://nuxt.com/modules/vite-pwa-nuxt
    // https://vite-pwa-org.netlify.app/frameworks/nuxt.html#vitepwamanifest-nuxtpwamanifest-in-app-vue
    '@vite-pwa/nuxt',
    // https://nuxt.com/modules/vee-validate
    '@vee-validate/nuxt',
    // https://github.com/nuxt/icon
    '@nuxt/icon',
    // https://nuxt.com/modules/device
    '@nuxtjs/device',
    // https://github.com/unplugin/unplugin-icons
    'unplugin-icons/nuxt',
  ],

  ssr: Boolean(process.env.NUXT_SSR),

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: true,
      },
    ],
  },

  imports: {
    dirs: [
      './api/**',
      './composables/**',
      './utils/**',
      '../shared/**',
    ],
  },

  devtools: {
    enabled: Boolean(process.env.NUXT_DEVTOOLS),
  },

  app: {
    head: headConfig,
  },

  css: [
    '~/assets/stylesheets/main.scss',
  ],

  runtimeConfig: {
    public: {
      APP_DEBUG: Boolean(process.env.APP_DEBUG),
      APP_IS_PROD: Boolean(process.env.APP_IS_PROD),
      BASE_URL: String(process.env.BASE_URL),
      DEBUG: Boolean(process.env.DEBUG),
      NUXT_SSR: Boolean(process.env.NUXT_SSR),
    },
  },

  sourcemap: {
    client: Boolean(process.env.APP_DEBUG),
    server: Boolean(process.env.APP_DEBUG || process.env.NUXT_SSR ? 1 : process.env.APP_DEBUG),
  },

  devServer: {
    host: String(process.env.HOST) || '0.0.0.0',
    port: Number(process.env.NITRO_PORT) || 3000,
  },

  features: {
    inlineStyles: false,
  },

  experimental: experimentalConfig,

  compatibilityDate: '2025-06-10',

  vite: viteConfig,

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
    checker: true,
  },

  icon: {
    provider: 'server',
    customCollections: [
      {
        prefix: 'asset',
        dir: './app/assets/icons',
      },
    ],
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  pwa: pwaConfig,

  stylelint: {},
})
