<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>{{ $t('home.title') }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
useTitle(i18n.t('home.seo_title'))
</script>
