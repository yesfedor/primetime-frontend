<template>
  <v-card
    link
    :to="toWatchPage"
    class="app-watch-card"
  >
    <v-img
      :src="item.posterUrl || getPosterImageByKinopoiskid(item.kinopoiskId)"
      :height="height"
      scale="0.8"
      gradient="0deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.15) 100%"
      cover
      class="align-end"
    >
      <v-card-title class="d-flex align-center text-white text-body-2">
        <template v-if="item.type">
          <span class="text-capitalize">{{ item.type && $t(`watch.type.${item.type}`) }}</span>
          <span class="px-2"> ● </span>
        </template>
        <span v-if="item.year">{{ item.year }}</span>
        <template v-if="item.ratingKinopoisk && item.ratingKinopoisk !== 'null' && item.ratingKinopoisk !== '0.0'">
          <span v-if="item.type || item.year" class="px-2"> ● </span>
          <div class="d-inline-flex align-center">
            <v-icon
              icon="mdi-star"
              size="16"
              class="pe-2"
            /> {{ item.ratingKinopoisk }}
          </div>
        </template>
      </v-card-title>
    </v-img>
    <v-list class="py-1">
      <v-list-item :prepend-avatar="item.posterUrl || getPosterImageByKinopoiskid(item.kinopoiskId)">
        <v-list-item-title class="text-body-2">{{ item.nameRu }}</v-list-item-title>
        <template #append>
          <AppWatchActions :item="item" />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import type { WatchApiContentItem } from '@/api/watch'
import AppWatchActions from '@/components/watch/Actions.vue'
import { useWatchHeight } from '@/composables/useWatchHeight'

interface Props {
  item: WatchApiContentItem
}

const props = defineProps<Props>()
const { item } = toRefs(props)

const { height } = useWatchHeight()

const authProvider = useAuth()

const toWatchPage = computed(() => {
  return {
    name: authProvider.user.isAuth ? RouteNamesEnum.watch : RouteNamesEnum.trailer,
    params: {
      kpid: item.value.kinopoiskId,
    },
    query: {
      [UTM_SOURCE_KEY]: UTM_SOURCE.watchcard,
    },
  }
})
</script>
