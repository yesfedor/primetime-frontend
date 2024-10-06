<template>
  <div class="app-global-scope">
    <AppLoaderDialog />
  </div>
</template>

<script lang="ts" setup>
import AppLoaderDialog from '@/components/common/LoaderDialog.vue'
import { useThemeSave } from '@/composables/useThemeSave'

useThemeSave()

const router = useRouter()
const route = useRoute()
const authProvider = useAuth()

watch(authProvider.user, (user) => {
  if (route && route.meta?.isNeedAuth && !user.isAuth) {
    router.push(getFailRoute(route))
  }
})
</script>
