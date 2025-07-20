<template>
  <header class="app-header">
    <div class="app-header__start">
      <ui-burger />
      <ui-logo square-on-mobile />
    </div>

    <div class="app-header__center">
      <ui-search variant="nav" />
    </div>

    <div class="app-header__end">
      <ui-header-actions />
    </div>
  </header>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  height: calc(var(--liquid-header-height) - 1rem);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: var(--theme-background);
  border-bottom: 1rem solid var(--theme-border);
  z-index: z('header');

  @include bp-tablet {
    padding: 0 spacing(8);
  }

  &__start {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0 spacing(3);

    @include bp-tablet {
      gap: 0 spacing(6);
    }
  }

  &__center {
    padding: 0 spacing(6);
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 spacing(6);
  }

  &__end {
    padding: 0 spacing(6);
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0 spacing(6);
  }
}
</style>
