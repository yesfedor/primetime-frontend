<template>
  <div class="app-search">
    <AppWatchParallax
      :poster-url="cardFirstItem && cardFirstItem.posterUrl || ''"
      :loading="loadingSearch"
      label-key="search.title"
    />
    <v-container fluid>
      <v-col cols="12" md="6" lg="3" class="ps-0">
        <v-text-field
          v-model:model-value="searchField"
          :loading="isLoading || loadingSearch"
          :placeholder="$t('search.title')"
          bg-color="surface"
          type="search"
          append-inner-icon="mdi-magnify"
          clearable
          @click:append-inner="changedSearchField"
          @keyup.enter="changedSearchField"
        />
      </v-col>
      <AppWatchList :list="cardList" :is-loading="isLoading" />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { WatchApiContentItem } from '~/api/watch'
import { watchApi } from '~/api/watch'
import AppWatchList from '~/components/watch/List.vue'
import AppWatchParallax from '~/components/watch/Parallax.vue'
import { useWatchList } from '~/composables/useWatchList'

const i18n = useI18n()
useTitle(i18n.t('search.title'))

const authProvider = useAuth()

const loadingSearch = ref(false)
const searchField = ref('')
const lastSearchPhrase = ref('')

const { refreshList, cardFirstItem, cardList, isLoading } = await useWatchList<WatchApiContentItem>({
  async loadFn() {
    lastSearchPhrase.value = searchField.value
    const result = await watchApi.fastSearch(searchField.value, authProvider.getJwt(), await authProvider.getClientId())
    if (result?.total) {
      return result.content as WatchApiContentItem[]
    }
    return []
  },
})

const router = useRouter()
const changedSearchField = () => {
  if (loadingSearch.value || lastSearchPhrase.value === searchField.value || !searchField.value) {
    return
  }
  router.push({
    name: RouteNamesEnum.search,
    params: {
      search: encodeURIComponent(searchField.value),
    },
    query: {
      [UTM_SOURCE_KEY]: UTM_SOURCE.searchbox,
    },
  })
  refreshList()
}

const route = useRoute()
if (typeof route.params.search === 'string') {
  const searchText = decodeURIComponent(route.params.search)
  searchField.value = searchText
  refreshList()
}
</script>
