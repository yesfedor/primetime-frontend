<template>
  <aside
    :class="{
      '--show': aside.isShow.value,
    }"
    class="app-aside"
  >
    <div class="app-aside__container">
      <div class="app-aside__content">
        <ui-aside-navigation />
      </div>

      <ui-aside-footer />
    </div>
  </aside>
</template>

<script lang="ts" setup>
const aside = useAside()
</script>

<style lang="scss">
.app-aside {
  display: none;
  width: var(--liquid-aside-width);
  height: var(--liquid-aside-height);
  position: fixed;
  top: var(--liquid-aside-top);
  left: 0;
  bottom: 0;
  background: var(--theme-background);
  border-right: 1rem solid var(--theme-border);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: z('aside');

  @include use-scrollbar($scrollbar-width);

  @include bp-desktop {
    display: block;
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

  &.--show {
    display: block;
  }
}
</style>
