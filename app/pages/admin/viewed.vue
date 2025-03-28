<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Просмотренное пользователями</h1>
      </v-col>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row v-if="!isLoading && viewed.length">
      <v-col
        v-for="item in viewed"
        :key="`${item.user_uid}-${item.kinopoiskId}-${item.watch_time}`"
        cols="12"
        md="6"
        lg="3"
      >
        <v-card
          :to="{ name: RouteNamesEnum.watch, params: { kpid: item.kinopoiskId } }"
          link
        >
          <v-img
            :src="item.posterUrl"
            :aspect-ratio="4 / 3"
            cover
            gradient="0deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.15) 100%"
            scale="0.8"
            class="align-end"
          >
            <v-row class="px-4 pb-2">
              <v-col cols="12">
                <h4>{{ getTime(Number(item.watch_time)) }}</h4>
              </v-col>
            </v-row>
          </v-img>
          <v-card-title>{{ capitalizeFirstLetter($t(`watch.type.${item.type}`)) }} - {{ item.nameRu }}</v-card-title>
          <v-card-text>{{ item.user_name }} {{ item.user_surname }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="isLoading">
      <v-col>
        <h4>Загрузка</h4>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <h4>ПУСТО</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { watchApi, type WatchApiGAdminViewed } from '@/api/watch'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter.helper'
import { useTimeAgo } from '@vueuse/core'

definePageMeta({
  isNeedAuth: true,
  access: IUserResponceAccess.author,
})

const authProvider = useAuth()

const isLoading = ref(false)
const viewed = ref([]) as Ref<WatchApiGAdminViewed[]>

async function loadViewed() {
  isLoading.value = true
  const result = await watchApi.adminViewed(authProvider.getJwt())
  if (result && result.length) {
    viewed.value = result
  }
  else {
    viewed.value = []
  }
  isLoading.value = false
}

const currentTime = Date.now()
const offsetTime = 604800 * 1000

const getTime = computed(() => {
  return (time: number) => {
    time = time * 1000
    const date = new Date(time)
    if (currentTime - time > offsetTime) {
      return date.toLocaleString('ru-RU')
    }
    return useTimeAgo(date).value
  }
})

const timer = setInterval(() => {
  loadViewed()
}, 5 * 60 * 1000)

onMounted(async () => await loadViewed())
onUnmounted(() => clearInterval(timer))
</script>
