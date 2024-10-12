<template>
  <div class="app-staff">
    <AppWatchParallax
      :poster-url="cardFirstItem && cardFirstItem.posterUrl || ''"
      :loading="isLoading"
      :label-key="staffName"
    />
    <v-container fluid>
      <AppWatchList
        :list="cardList"
        :is-loading="isLoading"
      />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { watchApi, type WatchApiContentItem } from '~/api/watch'
import AppWatchList from '~/components/watch/List.vue'
import AppWatchParallax from '~/components/watch/Parallax.vue'
import { useWatchList } from '~/composables/useWatchList'

const i18n = useI18n()
useTitle(i18n.t('search.title'))

const router = useRouter()

const staffId = computed(() => {
  return router.currentRoute.value.params.staff as string
})

const staffName = ref('')

const { cardFirstItem, cardList, isLoading } = await useWatchList<WatchApiContentItem>({
  async loadFn() {
    const result = await watchApi.getNameByStaffId(staffId.value)
    if (result?.title) {
      staffName.value = result.title
    }
    if (result?.items) {
      return result.items.filter(item => item.nameRu) as WatchApiContentItem[]
    }
    return []
  },
})
</script>
