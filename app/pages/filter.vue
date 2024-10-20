<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h1>{{ $t('navigation.searchFilter') }}</h1>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col
                cols="12"
                md="6"
                lg="3"
              >
                <v-select
                  v-model="activeFilters.country"
                  :items="countries"
                  item-value="id"
                  item-title="country"
                  label="Страна"
                  hide-details
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
                lg="3"
              >
                <v-select
                  v-model="activeFilters.genre"
                  :items="genres"
                  item-value="id"
                  item-title="genre"
                  label="Жанр"
                  hide-details
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
                lg="3"
              >
                <v-select
                  v-model="activeFilters.order"
                  :items="orders"
                  item-value="key"
                  item-title="label"
                  label="Сортировка"
                  hide-details
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
                lg="3"
              >
                <v-select
                  v-model="activeFilters.type"
                  :items="types"
                  item-value="key"
                  item-title="label"
                  label="Тип"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col
                cols="12"
                md="6"
                lg="3"
              >
                <v-text-field
                  v-model="activeFilters.year"
                  label="Год"
                  type="number"
                  min="1959"
                  max="2025"
                  hide-details
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
                lg="3"
                class="d-flex align-center justify-center"
              >
                <v-btn
                  variant="tonal"
                  block
                  @click="refreshList"
                >
                  {{ $t('search.mini') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <AppWatchList
          :list="cardList"
          :is-loading="isLoading"
          use-skeleton
          :cards-sizes="WATCH_CARDS_SIZES"
        />
      </v-col>
      <v-col
        v-if="pages > 1"
        cols="12"
      >
        <v-pagination
          :model-value="page"
          :length="pages"
          @update:model-value="setPage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { watchApi, type WatchApiContentItem, type WatchContentType } from '~/api/watch'
import filters from '~/assets/filters.json'
import AppWatchList from '~/components/watch/List.vue'
import { useWatchList } from '~/composables/useWatchList'

const countries: { id: number, country: string }[] = filters.countries
const genres: { id: number, genre: string }[] = filters.genres
const orders: { key: 'RATING' | 'NUM_VOTE' | 'YEAR', label: string }[] = [
  { key: 'RATING', label: 'По рейтингу' },
  { key: 'YEAR', label: 'По году' },
  { key: 'NUM_VOTE', label: 'По кол-ву голосов' },
]
const types: { key: WatchContentType, label: string }[] = [
  { key: 'ALL', label: 'Всё' },
  { key: 'FILM', label: 'Фильмы' },
  { key: 'TV_SERIES', label: 'Сериалы' },
  { key: 'MINI_SERIES', label: 'Мини-сериалы' },
  { key: 'TV_SHOW', label: 'ТВ - шоу' },
]

const { t } = useI18n()
useTitle(t('search.title'))

const activeFilters = reactive({
  country: countries[0]!.id,
  genre: genres[0]!.id,
  order: orders[0]!.key,
  type: types[0]!.key,
  year: 2024,
})

const pages = ref(1)
const page = ref(1)

const { cardList, isLoading, refreshList } = await useWatchList<WatchApiContentItem>({
  uuid: 'list-by-filters',
  async loadFn() {
    pages.value = 1
    const result = await watchApi.searchByFilters(activeFilters.country, activeFilters.genre, activeFilters.order, activeFilters.type, activeFilters.year, page.value)
    if (result?.code) {
      pages.value = Number(result.pages)
      page.value = Number(result.page)
      return result.items
    }
    return []
  },
})

async function setPage(value: number) {
  page.value = value
  await refreshList()
  if (import.meta.client) {
    window.scrollTo(0, 0)
  }
}
</script>
