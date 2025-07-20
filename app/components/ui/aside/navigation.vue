<template>
  <nav class="ui-aside-navigation">
    <div
      v-if="menu"
      class="ui-aside-navigation__chapters"
    >
      <template
        v-for="chapter in menu.chapters"
        :key="chapter.key"
      >
        <template v-if="chapter.links.length">
          <ui-aside-chapter :chapter="chapter" />
          <ui-divider class="ui-aside-navigation__divider" />
        </template>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const asideQuery = useAsyncData('ui-aside-navigation:menu', async () => await useAsideMenu())

const menu = computed(() => {
  return asideQuery.data.value?.menu.value
})
</script>

<style lang="scss">
.ui-aside-navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  &__chapters {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__divider {
    --ui-divider-spacing: #{spacing(8)} 0;
  }
}
</style>
