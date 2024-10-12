<template>
  <v-menu
    v-model:model-value="menu"
    :close-on-content-click="false"
    location="left top"
    content-class="app-search-trigger-menu"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="text"
        icon="mdi-magnify"
        class="order-0 order-md-1"
      />
    </template>
    <v-list
      width="320"
      max-height="500"
      class="app-search-trigger-menu__list pa-0 mt-n2 me-2 overflow-hidden"
    >
      <v-list-item class="pa-0">
        <v-text-field
          :model-value="searchField"
          :placeholder="$t('search.autocomplete.empty')"
          :loading="isLoading"
          :autofocus="true"
          variant="solo-filled"
          type="search"
          hide-details
          clearable
          @update:model-value="updateSearch"
          @keyup.enter="openFullPage(searchField)"
        >
          <template #append-inner>
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              size="22"
              width="2"
            />
          </template>
        </v-text-field>
      </v-list-item>
      <v-list-item
        v-if="listDataType === 'empty' && searchHistoryHints.length"
        class="px-0 py-2"
      >
        <v-list
          width="320"
          class="pa-0"
        >
          <v-list-item
            v-for="hint in searchHistoryHints"
            :key="hint.id"
            link
            class="app-search-trigger-menu-hint-history text-truncate"
          >
            <v-list-item-title @click="openFullPage(hint.query)">{{ hint.query }}</v-list-item-title>
            <template #append>
              <v-btn
                :disabled="loadingRemoveHistoryHint"
                :loading="loadingRemoveHistoryHint"
                variant="text"
                density="comfortable"
                icon="mdi-close"
                class="app-search-trigger-menu-hint-history__append transition-swing"
                @click.stop="removeHistoryHint(hint.id)"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-list-item>
      <v-list-item
        v-if="listDataType !== 'empty'"
        class="pa-0 py-2"
      >
        <v-list
          width="320"
          class="pa-0"
        >
          <v-list-item
            v-if="listDataType === 'no_result'"
            key="no_result"
            :title="$t('search.autocomplete.no_result')"
          />
          <template
            v-for="(hint, index) in hints"
            :key="hint.kinopoiskId"
            :tabindex="index + 1"
          >
            <v-list-item
              v-if="hint._type === 'watch'"
              :to="getRouteToWatchPage(hint.kinopoiskId)"
              :prepend-avatar="getPosterImageByKinopoiskid(hint.kinopoiskId)"
              :class="{ 'd-none': !hint.nameRu }"
              class="text-truncate"
              link
              @click="menu = false"
            >
              <v-list-item-title>{{ hint.nameRu }}</v-list-item-title>
              <v-list-item-subtitle class="d-flex align-center">
                <span>{{ $t(`watch.type.${hint.type}`) }}</span>
                <span class="px-2"> - </span>
                <span>{{ hint.year }}</span>
                <template v-if="hint.ratingKinopoisk !== 'null'">
                  <span class="px-2"> - </span>
                  <span class="d-flex align-center">
                    <v-icon
                      icon="mdi-star"
                      size="16"
                      class="pe-2"
                    />
                    <span>{{ hint.ratingKinopoisk }}</span>
                  </span>
                </template>
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              v-else-if="hint._type === 'staff'"
              :to="getRouteToStaffPage(hint.kinopoiskId)"
              :prepend-avatar="hint.posterUrl"
              :class="{ 'd-none': !hint.nameRu || !hint.posterUrl }"
              class="text-truncate"
              link
              @click="menu = false"
            >
              <v-list-item-title>{{ hint.nameRu }}</v-list-item-title>
              <v-list-item-subtitle class="d-flex align-center">
                {{ hint.sex === 'FEMALE' ? $t('staff.hint.sex.FEMALE') : $t('staff.hint.sex.MALE') }}
              </v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-list>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import type { WatchApiFastSearchHistoryItem, WatchApiFastSearchItem } from '@/api/watch'
import { watchApi } from '@/api/watch'
import { watchDebounced } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'

const router = useRouter()

const menu = ref(false)

const authProvider = useAuth()

const searchField = ref('')
const isLoading = ref(false)

const hints = ref<WatchApiFastSearchItem[]>([])

const listDataType = computed(() => {
  if (isLoading.value) {
    return 'loading'
  }
  if (hints.value.length) {
    return 'result'
  }
  if (searchField.value && searchField.value.length > 3) {
    return 'no_result'
  }
  return 'empty'
})

function isQueryValid(query: string) {
  return query && query.length > 2
}

function updateSearch(input: string) {
  if (isQueryValid(input)) {
    isLoading.value = true
  }
  searchField.value = input
}

watchDebounced(searchField, async (query: string) => {
  if (!isQueryValid(query)) {
    isLoading.value = false
    return (hints.value = [])
  }
  const result = await watchApi.fastSearch(query, authProvider.getJwt(), await authProvider.getClientId())
  if (result?.total) {
    hints.value = result.content.slice(0, 9)
  }
  else {
    hints.value = []
  }
  isLoading.value = false
}, { debounce: 500, maxWait: 1500 })

function openFullPage(search: string) {
  menu.value = false
  searchField.value = ''
  router.push({
    name: RouteNamesEnum.search,
    params: {
      search: encodeURIComponent(search),
    },
    query: {
      [UTM_SOURCE_KEY]: UTM_SOURCE.searchbox,
    },
  })
}

const searchHistoryHints = ref<WatchApiFastSearchHistoryItem[]>([])

async function loadSearchHistoryHints() {
  if (!authProvider.user.isAuth) {
    return false
  }
  const result = await watchApi.fastSearchHistory(authProvider.getJwt(), await authProvider.getClientId())
  if (!result) {
    searchHistoryHints.value = []
    return
  }
  searchHistoryHints.value = result.queries
}

const loadingRemoveHistoryHint = ref(false)
async function removeHistoryHint(id: string) {
  loadingRemoveHistoryHint.value = false
  if (!authProvider.getJwt()) {
    return
  }
  loadingRemoveHistoryHint.value = true
  const result = await watchApi.fastSearchHistoryDelete(id, authProvider.getJwt(), await authProvider.getClientId())
  if (!result) {
    return
  }
  await loadSearchHistoryHints()
  loadingRemoveHistoryHint.value = false
}

onMounted(() => {
  loadSearchHistoryHints()
})

watch(authProvider.user, (user) => {
  if (user.isAuth) {
    loadSearchHistoryHints()
  }
  else {
    searchHistoryHints.value = []
  }
})

function getRouteToStaffPage(kinopoiskId: number) {
  return {
    name: RouteNamesEnum.staff,
    params: {
      staff: kinopoiskId,
    },
    query: {
      [UTM_SOURCE_KEY]: UTM_SOURCE.searchhint,
    },
  }
}

function getRouteToWatchPage(kinopoiskId: number) {
  return {
    name: RouteNamesEnum.watch,
    params: {
      kpid: kinopoiskId,
    },
    query: {
      [UTM_SOURCE_KEY]: UTM_SOURCE.searchhint,
    },
  }
}
</script>

<style lang="scss">
.app-search-trigger-menu {
  &__list {
    min-width: 320px;
    .v-field__input {
      padding: 4px 12px !important;
      min-height: 48px !important;
      height: 48px !important;
    }
  }
  &-hint-history {
    &__append {
      display: none;
    }
    &:hover &__append {
      display: block;
    }
  }
}
</style>
