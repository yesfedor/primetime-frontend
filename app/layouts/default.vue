<template>
  <layout-provider>
    <div class="app-layout app-layout-default">
      <layout-base-header class="app-layout-default__header" />

      <layout-base-aside class="app-layout-default__aside" />

      <main class="app-layout__view app-layout-default__view">
        <slot />
      </main>

      <layout-base-footer class="app-layout-default__footer" />
    </div>
  </layout-provider>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.app-layout-default {
  min-height: 100dvh;
  display: grid;
  gap: 0;
  grid-template-columns: 1fr;
  grid-template-rows: var(--liquid-header-height) 1fr auto;
  grid-template-areas:
    "header"
    "view"
    "footer";

  @include bp-desktop {
    grid-template-columns: var(--liquid-aside-width) 1fr;
    grid-template-areas:
      "header header"
      "aside view"
      "aside footer";
  }

  &__header {
    grid-area: header;
  }

  &__aside {
    grid-area: aside;
  }

  &__view {
    grid-area: view;
  }

  &__footer {
    grid-area: footer;
  }
}
</style>
