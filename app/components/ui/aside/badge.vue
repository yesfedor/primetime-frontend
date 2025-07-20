<template>
  <div class="ui-aside-badge">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.ui-aside-badge {
  padding: spacing(1) spacing(4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-nav-badge-text);
  font-size: 12rem;
  font-weight: 400;
  background: var(--theme-progress-bg);
  border-radius: 12rem;
  user-select: none;
}
</style>
