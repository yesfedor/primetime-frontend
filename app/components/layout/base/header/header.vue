<template>
  <header class="app-header">
    PrimeTime
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
  background: var(--background);
  border-bottom: 1rem solid var(--border);
  z-index: z('header');
}
</style>
