<template>
  <ui-button
    :icon="aside.iconName.value"
    class="ui-burger"
    @click="aside.toggle()"
  />
</template>

<script lang="ts" setup>
const aside = useAside()
</script>

<style lang="scss">
.ui-burger {
  color: var(--theme-text-primary);
  font-size: 24rem;
}
</style>
