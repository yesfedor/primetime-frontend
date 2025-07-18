export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return {
      appConfig: {},
    }
  },
  actions: {
    async initializationGlobal() {},
    async initializationServerOnly() {},
    async initializationClientOnly() {},
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
