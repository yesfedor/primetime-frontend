import type { Ref } from 'vue'

interface WatchListProps<ITEM> {
  loadFn: () => Promise<ITEM[]>
  before?: () => void
  after?: () => void
  errorFn?: (e: unknown) => unknown
}

export async function useWatchList<ITEM>(props: WatchListProps<ITEM>) {
  const cardList = ref<ITEM[]>([]) as Ref<ITEM[]>
  const isLoading = ref(false)

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

  await useAsyncData(`watch-list:${router.currentRoute.value.name as string}`, async () => {
    return await loadList()
  }, { lazy: true })

  return {
    refreshList,
    cardFirstItem,
    cardList,
    isLoading,
  }
}
