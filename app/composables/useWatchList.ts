import type { Ref } from 'vue'

interface WatchListProps<ITEM> {
  uuid?: string
  loadFn: () => Promise<ITEM[]>
  before?: () => void
  after?: () => void
  errorFn?: (e: unknown) => unknown
}

export async function useWatchList<ITEM>(props: WatchListProps<ITEM>) {
  const cardList = ref<ITEM[]>([])
  const isLoading = ref(false)
  const isEmpty = computed(() => cardList.value.length)

  const cardFirstItem = computed(() => {
    if (!cardList.value.length) {
      return undefined
    }
    return cardList.value[0]
  })

  const loadList = async () => {
    isLoading.value = true

    try {
      typeof props.before === 'function' && props.before()
      const result = await props.loadFn()
      if (result.length) {
        cardList.value = result
      } else {
        cardList.value = []
      }
      typeof props.after === 'function' && props.after()
    }
    catch (e) {
      typeof props.errorFn === 'function' && props.errorFn(e)
    }

    isLoading.value = false
    return cardList.value
  }

  const refreshList = async () => {
    await loadList()
  }

  const router = useRouter()

  const uuid = props.uuid ? props.uuid : `watch-list:${router.currentRoute.value.name as string}`
  const { data } = await useAsyncData(uuid, async () => {
    return await loadList()
  }, { lazy: true })

  if (Array.isArray(data.value)) {
    cardList.value = data.value
  }

  return {
    refreshList,
    cardFirstItem,
    cardList,
    isLoading,
    isEmpty,
  }
}
