<script lang="ts" setup>
import Page404 from '~/pages/error/404.vue'

const error = useError()
</script>

<template>
  <div class="app-root app-root--error">
    <nuxt-route-announcer />
    <vite-pwa-manifest />

    <nuxt-layout name="default">
      <Page404 />
      <dev-only>
        <pre
          v-if="error"
          style="white-space: pre-line; text-align: center;"
        >
          [VueRouterError]: {{ error.message }}
        </pre>
      </dev-only>
    </nuxt-layout>

    <core-scope />
  </div>
</template>
