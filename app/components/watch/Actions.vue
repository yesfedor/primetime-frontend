<template>
  <v-menu location="left center">
    <template #activator="{ props }">
      <v-btn
        variant="text"
        icon="mdi-dots-vertical"
        v-bind="props"
        @click.prevent
      />
    </template>
    <v-list
      width="320"
      bg-color="secondary"
      class="me-lg-1"
    >
      <v-list-item class="d-flex align-center justify-space-between w-100">
        <v-btn
          v-for="share in sharingInfo"
          :key="share.payload"
          :icon="share.icon"
          variant="text"
          @click="shareAction(share.payload)"
        />
        <template #prepend>
          <AppWatchSubscribeManager :kinopoisk-id="item.kinopoiskId" />
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import type { WatchApiContentItem } from '@/api/watch'
import AppWatchSubscribeManager from '@/components/watch/SubscribeManager.vue'
import { Share } from '@/utils/share'
// @ts-expect-error typescript error
import { computed, defineProps, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  item: WatchApiContentItem
}

const props = defineProps<Props>()

enum sharingType {
  vk = 'vk',
  telegram = 'telegram',
  twitter = 'twitter',
  link = 'link',
}

const { item } = toRefs(props)

const sharingInfo = [
  {
    icon: 'fa:fab fa-vk',
    payload: sharingType.vk,
  },
  {
    icon: 'fa:fab fa-telegram',
    payload: sharingType.telegram,
  },
  // {
  // 	icon: 'fa:fab fa-twitter',
  // 	payload: sharingType.twitter,
  // },
  {
    icon: 'fa:fas fa-link',
    payload: sharingType.link,
  },
]

const router = useRouter()
const i18n = useI18n()

const url = router.resolve({
  name: RouteNamesEnum.watch,
  params: {
    kpid: item.value.kinopoiskId,
  },
  query: {
    [UTM_SOURCE_KEY]: UTM_SOURCE.shareapi,
  },
})

const urlHref = API_SHARE + url.href

function firstUpperCase(word: string) {
  const letters = [...word]
  letters[0] = letters[0].toUpperCase()
  return letters.join('')
}

const title = computed(() => {
  const type = firstUpperCase(i18n.t(`watch.type.${item.value.type}`))
  return i18n.t('watch.share.title', {
    type,
    title: firstUpperCase(item.value.nameRu),
    year: item.value.year,
  })
})

function shareAction(payload: keyof typeof sharingType) {
  switch (payload) {
  case sharingType.link:
    if ('canShare' in navigator) {
      const share = {
        title: title.value,
        text: '',
        url: urlHref,
      }
      const canShare = navigator.canShare(share)
      if (canShare) {
        navigator.share(share)
      }
    }
      else {
      if ('clipboard' in navigator) {
        // @ts-expect-error clipboard error
        navigator.clipboard.writeText(title.value)
      }
    }
    return
  case sharingType.telegram:
    Share.telegram(urlHref, title.value)
    return
  case sharingType.vk:
    Share.vk(urlHref, title.value, item.value.posterUrl, '')
    return
  case sharingType.twitter:
    Share.twitter(urlHref, title.value)
  }
}
</script>
