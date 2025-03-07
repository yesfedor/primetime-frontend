<template>
  <v-row>
    <v-col
      v-if="isShowLoading"
      cols="12"
      class="text-center"
    >
      <h2>{{ isLoading ? $t('app.loading') : $t('app.no_result') }}</h2>
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        size="32"
        width="4"
        class="mt-5"
      />
    </v-col>
    <template v-else>
      <template v-if="isLoading && useSkeleton">
        <v-col
          v-for="id in '12345678'"
          :key="id"
          v-bind="bindCardsSizes"
        >
          <v-skeleton-loader
            :loading="isLoading"
            type="card-avatar"
            boilerplate
            class="mb-5"
          />
        </v-col>
      </template>
      <template v-else>
        <v-col
          v-for="item in list"
          :key="item.id"
          v-bind="bindCardsSizes"
        >
          <AppWatchCardStaff v-if="item?._type === 'staff'" :item="item" />
          <AppWatchCardDefault v-else :item="item" />
        </v-col>
      </template>
    </template>
  </v-row>
</template>

<script lang="ts" setup>
import type { WatchApiContentItem } from '@/api/watch'
import AppWatchCardStaff from '@/components/watch/card/Staff.vue'
import AppWatchCardDefault from '@/components/watch/card/Default.vue'
// @ts-expect-error typescript error
import { computed, defineProps, toRefs } from 'vue'

interface Props {
  list: WatchApiContentItem[]
  isLoading?: boolean
  useSkeleton?: boolean
  cardsSizes?: {
    cols?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

const props = defineProps<Props>()
const { list, isLoading, cardsSizes, useSkeleton } = toRefs(props)

const isShowLoading = computed(() => {
  if (useSkeleton.value) {
    return false
  }
  return isLoading.value || !list.value.length
})

const bindCardsSizes = computed(() => {
  return Object.assign({}, WATCH_CARDS_SIZES, cardsSizes?.value)
})
</script>
