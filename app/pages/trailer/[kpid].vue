<template>
  <v-container
    fluid
    class="app-page-trailer fill-height app-trailer-page__wrapper wrapper"
  >
    <v-row class="fill-height">
      <v-col
        cols="12"
        class="fill-height"
      >
        <v-card
          v-if="trailerData"
          class="w-100 fill-height"
        >
          <template #image>
            <v-img
              :src="getPosterImageByKinopoiskid(trailerData?.kinopoiskId || 0)"
              cover
              position="center center"
            />
          </template>

          <v-card-title class="text-center text-h4">
            <span class="text-capitalize">{{ trailerType }}</span>
            <span>{{ trailerData.nameRu }}</span>
          </v-card-title>

          <v-card-text>
            <p class="app-page-trailer__description w-lg-50">
              <span class="text-body-1">
                {{ $t('trailer.descripton') }}
              </span>
              <br>
              <span class="text-body-1 app-trailer-page__description-text">
                {{ trailerData.description }}
              </span>
            </p>

            <AppTraierInfo
              v-if="trailerData"
              :item="trailerData"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn
              variant="flat"
              class="mt-1 mt-md-0"
              @click="routeToAuthPage"
            >
              {{ $t('auth.register') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { WatchApiExpandedItem } from '@/api/watch'
import { watchApi } from '@/api/watch'
import AppTraierInfo from '@/components/watch/trailer/Info.vue'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter.helper'
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
useTitle(t('app.loading'))

const resolvedAuthUrl = router.resolve({
  name: RouteNamesEnum.watch,
  params: {
    kpid: route.params.kpid,
  },
})

function routeToAuthPage() {
  router.push({
    name: RouteNamesEnum.auth,
    query: {
      [AUTH_FROM_KEY]: resolvedAuthUrl.href,
      [UTM_SOURCE_KEY]: UTM_SOURCE.trailerpage,
    },
  })
}

const trailerQuery = await useAsyncData('trailer-data', async () => {
  const kpid = route.params?.kpid
  if (!kpid || typeof kpid === 'object') {
    return false
  }
  const result = await watchApi.getTrailerData(kpid)
  if (result?.kinopoiskId) {
    useTitle(t('watch.share.title', {
      type: capitalizeFirstLetter(t(`watch.type.${result.type}`)),
      title: result.nameRu || result.nameEn,
      year: result.startYear && result.endYear ? `${result.startYear} - ${result.endYear}` : result.year,
    }))
  }
  return result
})

const trailerData = computed(() => {
  return trailerQuery.data.value as WatchApiExpandedItem | null
})

const trailerType = computed(() => {
  if (trailerData.value) {
    return `${t(`watch.type.${trailerData.value.type}`)}: `
  }
  return ''
})
</script>

<style lang="scss">
.app-page-trailer {
  &__description-text {
    display: -webkit-box !important;
    max-height: calc(32px * 1);
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    @include bp-tablet-min {
      max-height: calc(32px * 12);
      -webkit-line-clamp: 12;
    }
  }

  .v-card__image {
    filter: brightness(75%) !important;
  }
}
</style>
