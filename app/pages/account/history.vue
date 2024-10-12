<template>
  <div class="app-history">
    <AppWatchParallax
      :poster-url="cardFirstItem && cardFirstItem.posterUrl || ''"
      :loading="isLoading"
      label-key="history.title"
    />
    <v-container fluid>
      <AppWatchList :list="cardList" :is-loading="isLoading" />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import type { WatchApiContentItem } from '@/api/watch'
import AppWatchList from '@/components/watch/List.vue'
import AppWatchParallax from '@/components/watch/Parallax.vue'
import { useWatchList } from '@/composables/useWatchList'
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

definePageMeta({
  isNeedAuth: true,
})

const { t } = useI18n()
useTitle(t('history.title'))

const authProvider = useAuth()

const { cardFirstItem, cardList, isLoading } = await useWatchList<WatchApiContentItem>({
  async loadFn() {
    const result = await watchApi.getUserHistory(authProvider.getJwt(), await authProvider.getClientId())
    if (result?.total) {
      return result.content
    }
    return []
  },
})
</script>
