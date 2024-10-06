<script lang="ts" setup>
definePageMeta({
  layout: 'offline',
})

const nuxtApp = useNuxtApp()

const baseUrl = ref(nuxtApp.$config.public.BASE_URL)
const nuxtVersion = ref(nuxtApp.versions.nuxt)
</script>

<template>
  <section class="app-page-offline">
    <h1>This is prerender page in offline</h1>

    <p>This is production: PrimeTime Client v{{ nuxtVersion }}</p>

    <p>Host: {{ baseUrl }}</p>

    <p>
      <nuxt-link :to="{ name: 'index' }">Back to homepage</nuxt-link>
    </p>
  </section>
</template>

<style lang="scss">
.app-page-offline {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: Roboto, system-ui;
}
</style>
