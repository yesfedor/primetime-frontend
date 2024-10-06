<template>
  <AppSearchTrigger />
  <AppAuthTrigger />
  <AppNavigationSettings />
</template>

<script lang="ts" setup>
import AppAuthTrigger from '@/components/auth/Trigger.vue'
import AppNavigationSettings from '@/components/navigation/Settings.vue'
import AppSearchTrigger from '@/components/search/Trigger.vue'
</script>
