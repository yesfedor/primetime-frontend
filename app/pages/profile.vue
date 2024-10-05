<template>
  <v-container fluid>Profile</v-container>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

definePageMeta({
  isNeedAuth: true,
})

const i18n = useI18n()
useTitle(i18n.t('search.title'))
</script>
