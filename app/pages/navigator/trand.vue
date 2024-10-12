<template>
  <div class="app-trand">
    <AppWatchParallax
      :poster-url="cardFirstItem && cardFirstItem.posterUrl || ''"
      label-key="trands.title"
      :loading="isLoading"
    />
    <v-container fluid>
      <v-tabs :model-value="selectedTab" @update:model-value="onChangeTab">
        <v-tab v-for="item in WATCH_TRANDS_TABS" :key="item.act" :value="item.act" density="compact">
          <span>{{ $t(`trands.filters.${item.labelKey}`) }}</span>
        </v-tab>
      </v-tabs>
      <v-window :model-value="selectedTab" class="mt-8">
        <v-window-item :value="selectedTab">
          <AppWatchList :list="cardList" :is-loading="isLoading" />
        </v-window-item>
      </v-window>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import type { WatchApiContentItem } from '@/api/watch'
import { watchApi } from '@/api/watch'
import AppWatchList from '@/components/watch/List.vue'
import AppWatchParallax from '@/components/watch/Parallax.vue'
import { useWatchList } from '@/composables/useWatchList'
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('trands.title'))

const selectedTab = ref(WATCH_TRANDS_TABS[0].act)

const { refreshList, cardFirstItem, cardList, isLoading } = await useWatchList<WatchApiContentItem>({
  async loadFn() {
    const result = await watchApi.getTrands(selectedTab.value)
    if (result?.total) {
      return result.content
    }
    return []
  },
})

function onChangeTab(value: unknown) {
  selectedTab.value = String(value)
  refreshList()
}
</script>
