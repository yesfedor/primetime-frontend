<template>
  <div class="app-subscriptions">
    <AppWatchParallax
      :poster-url="cardFirstItem && cardFirstItem.posterUrl || ''"
      :loading="isLoading"
      label-key="subscriptions.title"
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
useTitle(t('subscriptions.title'))

const authProvider = useAuth()

const { cardFirstItem, cardList, isLoading } = useWatchList<WatchApiContentItem>({
  async loadFn() {
    const result = await watchApi.getSubscriptions(authProvider.getJwt(), await authProvider.getClientId())
    if (result?.total) {
      return result.content
    }
    return []
  },
})
</script>
