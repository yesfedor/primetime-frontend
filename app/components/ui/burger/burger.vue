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
.ui-burger.ui-button {
  padding: spacing(1) spacing(3);
  color: var(--theme-text-primary);
  font-size: 32rem;
}
</style>
