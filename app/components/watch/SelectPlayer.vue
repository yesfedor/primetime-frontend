<template>
  <v-dialog
    v-model="dialog"
    width="auto"
    close-on-content-click
  >
    <template #activator="{ props }">
      <v-btn
        variant="flat"
        color="primary"
        v-bind="props"
        class="px-3"
      >
        {{ $t('player.select') }}
      </v-btn>
    </template>
    <v-list class="pa-8">
      <v-list-item>
        <v-list-item-title>{{ $t('player.select') }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="alias in PlayerAlias"
        :key="alias"
        :active="playerAlias === alias"
        link
        @click="setPlayerAlias(alias)"
      >
        {{ alias }}
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script lang="ts" setup>
import { PlayerAlias, usePlayer } from '@/composables/usePlayer'
import { ref } from 'vue'

const dialog = ref(false)
const { playerAlias, setPlayerAlias } = usePlayer(null)
</script>
