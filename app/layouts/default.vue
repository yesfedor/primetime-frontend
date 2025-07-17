<template>
  <layout-provider>
    <div class="app-layout app-layout-default">
      <layout-base-header class="app-layout-default__header" />

      <layout-base-aside class="app-layout-default__aside" />

      <div class="app-layout__view app-layout-default__view">
        <slot />
      </div>

      <layout-base-footer class="app-layout-default__footer" />
    </div>
  </layout-provider>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.app-layout-default {
  display: grid;
}
</style>
