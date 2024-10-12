<template>
  <v-card
    link
    :to="toWatchPage"
    class="app-watch-card"
  >
    <v-img
      :src="item.posterUrl"
      :height="height"
      scale="0.8"
      gradient="0deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.15) 100%"
      cover
      class="align-end"
    >
      <v-card-title class="d-flex align-center text-white text-body-2">
        <span class="text-capitalize">
          {{ item.sex === 'FEMALE' ? $t('staff.hint.sex.FEMALE') : $t('staff.hint.sex.MALE') }}
        </span>
      </v-card-title>
    </v-img>
    <v-list class="py-1">
      <v-list-item :prepend-avatar="item.posterUrl || getPosterImageByKinopoiskid(item.kinopoiskId)">
        <v-list-item-title class="text-body-2">{{ item.nameRu }}</v-list-item-title>
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

const toWatchPage = {
  name: RouteNamesEnum.staff,
  params: {
    staff: item.value.kinopoiskId,
  },
  query: {
    [UTM_SOURCE_KEY]: UTM_SOURCE.watchcard,
  },
}
</script>
