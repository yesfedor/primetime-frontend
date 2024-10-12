<template>
  <v-btn
    v-if="authProvider.user.isAuth"
    :loading="fetchLoading"
    :disabled="fetchLoading"
    :variant="variant"
    :icon="!showText"
    :color="color"
    v-bind="props"
    class="px-3"
    @click.stop="managerAction"
  >
    <span v-if="showText">
      {{ $t(`subscriptions.manager.action.${managerStatusAlt}`) }}
    </span>
    <v-icon
      v-else
      :icon="managerStatusIcon"
    />
  </v-btn>
</template>

<script lang="ts" setup>
import type { WatchApiSubscribeManagerType } from '@/api/watch'
import { watchApi } from '@/api/watch'
// @ts-expect-error typescript error
import { computed, defineProps, onMounted, ref, toRefs, watch } from 'vue'

interface Props {
  kinopoiskId: string
  showText?: boolean
}

const props = defineProps<Props>()
const { kinopoiskId, showText } = toRefs(props)

const managerStatus = ref<WatchApiSubscribeManagerType>('unsubscribe')

const isSubscribe = computed(() => {
  return managerStatus.value === 'subscribe'
})

const managerStatusAlt = computed((): WatchApiSubscribeManagerType => {
  return isSubscribe.value ? 'unsubscribe' : 'subscribe'
})

const managerStatusIcon = computed(() => {
  if (showText.value) {
    return undefined
  }
  return isSubscribe.value ? 'mdi-star' : 'mdi-star-outline'
})

const authProvider = useAuth()
const fetchLoading = ref(false)
async function fetchStatus() {
  if (!kinopoiskId.value) {
    return
  }
  fetchLoading.value = true
  const result = await watchApi.getUserRecord(Number(kinopoiskId.value), authProvider.getJwt(), await authProvider.getClientId())
  if (result?.kinopoiskId) {
    managerStatus.value = result.status
  }
  fetchLoading.value = false
}

watch(kinopoiskId, () => {
  fetchStatus()
})

async function managerAction() {
  fetchLoading.value = true
  const result = await watchApi.subscribeManager(managerStatusAlt.value, Number(kinopoiskId.value), authProvider.getJwt(), await authProvider.getClientId())
  if (result?.kinopoiskId) {
    managerStatus.value = result.status
  }
  setTimeout(() => {
    fetchLoading.value = false
  }, 500)
}

const variant = computed(() => {
  if (showText.value) {
    return isSubscribe.value ? 'outlined' : 'flat'
  }
  return 'text'
})

const color = computed(() => {
  return 'primary'
})

onMounted(() => {
  fetchStatus()
})
</script>
