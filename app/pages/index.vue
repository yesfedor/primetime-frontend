<template>
  <section class="app-home-page">
    <AppWatchParallax
      :poster-url="cardFirstItem && getPosterImageByKinopoiskid(cardFirstItem.kinopoiskId) || ''"
      :loading="isLoading"
      label-key="home.title"
    />
  </section>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('home.subtitle') }}</h2>
      </v-col>

      <v-col cols="12">
        <AppWatchList
          :list="cardList"
          :is-loading="isLoading"
          use-skeleton
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { watchApi, type WatchApiContentItem } from '~/api/watch'
import AppWatchList from '~/components/watch/List.vue'
import AppWatchParallax from '~/components/watch/Parallax.vue'
import { useWatchList } from '~/composables/useWatchList'

const i18n = useI18n()
useTitle(i18n.t('home.seo_title'))

const authProvider = useAuth()

const { cardFirstItem, cardList, isLoading } = await useWatchList<WatchApiContentItem>({
  uuid: 'home-suggestion-list',
  async loadFn() {
    const result = await watchApi.suggestionGetByUser(authProvider.getJwt())
    if (result?.total) {
      return result.content
    }
    return []
  },
})
</script>
