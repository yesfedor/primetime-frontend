import type { NuxtOptions } from '@nuxt/schema'

export default <Partial<NuxtOptions['pwa']>> {
  mode: 'development',
  strategies: 'generateSW',
  client: {
    periodicSyncForUpdates: 60,
  },
  registerType: 'autoUpdate',
  manifest: {
    id: 'su.primetime',
    name: 'PrimeTime - online cinema',
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone'],
    short_name: 'Nuxt',
    start_url: '/?pwa',
    scope: '/',
    theme_color: '#ffffff',
    background_color: '#000000',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon/android-chrome-192x192.png?v=1',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/android-chrome-512x512.png?v=1',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    protocol_handlers: [
      {
        protocol: 'web+nuxt',
        url: '/?query=%s',
      },
    ],
    lang: 'en',
  },
  workbox: {
    globPatterns: ['**\\/*.{js,wasm,css,html,webmanifest}'],
    navigateFallback: undefined,
    navigationPreload: true,
    skipWaiting: true,
    runtimeCaching: [],
  },
}
