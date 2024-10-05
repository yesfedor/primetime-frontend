<template>
  <v-container fluid>Feed</v-container>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

definePageMeta({
  isNeedAuth: true,
})

const { t } = useI18n()
useTitle(t('navigation.feed'))
</script>
