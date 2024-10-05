<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1>404 - {{ $t('app.no_result') }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('home.seo_title'))
</script>
