<template>
  <header class="app-header">
    <div class="app-header__start">
      <ui-burger />
      <ui-logo square-on-mobile />
    </div>
  </header>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  padding: 0 spacing(8);
  height: calc(var(--liquid-header-height) - 1rem);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: var(--theme-background);
  border-bottom: 1rem solid var(--theme-border);
  z-index: z('header');

  &__start {
    display: flex;
    align-items: center;
    gap: 0 spacing(6);
  }
}
</style>
