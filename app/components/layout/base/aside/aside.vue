<template>
  <aside class="app-aside">
    <div class="app-aside__container">
      <div class="app-aside__content">
        aside with more links
      </div>
      <div class="app-aside__footer">
        <span class="nav-text-small">© 2024 PrimeTime</span>
        <span class="nav-text-small">Онлайн кинотеатр</span>
        <span class="nav-text-small">О нас</span>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.app-aside {
  width: var(--liquid-aside-width);
  height: var(--liquid-aside-height);
  position: absolute;
  top: var(--liquid-aside-top);
  left: 0;
  border-right: 1rem solid var(--theme-border);
  overflow-x: hidden;
  overflow-y: auto;

  @include use-scrollbar($scrollbar-width);

  @include bp-desktop {
    position: sticky;
  }

  &__container {
    padding: var(--liquid-aside-container-spacing);
    min-height: calc(var(--liquid-aside-height) - calc(var(--liquid-aside-container-spacing) * 2));
    display: flex;
    gap: var(--liquid-aside-content-gap-y) 0;
    flex-direction: column;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__footer {
    padding: spacing(8) var(--liquid-aside-content-spacing-x);
    display: flex;
    flex-direction: column;
  }
}
</style>
