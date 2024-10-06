<template>
  <v-row>
    <v-col
      v-for="(list, type) of staffList"
      :key="type"
    >
      <template v-if="list.length">
        <h6 class="text-subtitle-1 mb-3">{{ headings[type] }}</h6>
        <client-only>
          <Swiper
            :userAgent="device.userAgent"
            :slides-per-view="slidesPerView"
            :space-between="spaceBetween"
            simulate-touch
          >
            <SwiperSlide
              v-for="item in list"
              :key="item.staffId"
            >
              <AppStaffCardDefault
                :item="item"
                :staff-type="type"
              />
            </SwiperSlide>
          </Swiper>
        </client-only>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import type { WatchApiGetStaffByKpid } from '@/api/watch'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, toRefs } from 'vue'
import AppStaffCardDefault from '~/components/staff/card/Default.vue'

const props = defineProps<Props>()

const device = useDevice()

interface Props {
  staff: WatchApiGetStaffByKpid['staff']
  limited: boolean
}

const { staff, limited } = toRefs(props)

const headings = {
  ACTOR: 'Актеры',
  PRODUCER: 'Режиссеры',
  WRITER: 'Сценаристы',
}

const staffList = computed(() => {
  const limit = limited.value ? 12 : 36
  return {
    ACTOR: staff.value?.ACTOR.slice(0, limit) || [],
    PRODUCER: staff.value?.PRODUCER.slice(0, limit) || [],
  }
})

const { width } = useSSRWindowSize()

const slidesPerView = computed(() => {
  if (width.value > 1779) {
    return 8
  }
  if (width.value > 1599) {
    return 7
  }
  if (width.value > 1359) {
    return 6
  }
  if (width.value > 1279) {
    return 5
  }
  if (width.value > 959) {
    return 4
  }
  if (width.value > 599) {
    return 3
  }
  return 2
})

const spaceBetween = computed(() => {
  if (width.value > 1279) {
    return 24
  }
  return 12
})
</script>
