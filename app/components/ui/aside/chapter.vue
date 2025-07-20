<template>
  <div class="ui-aside-chapter">
    <span class="ui-aside-chapter__label">
      {{ chapter.label }}
    </span>

    <div class="ui-aside-chapter__links">
      <template
        v-for="link in chapter.links"
        :key="link.key"
      >
        <ui-aside-link :link="link" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SharedAsideMenuChapter } from '#shared/types/aside'

interface Props {
  chapter: SharedAsideMenuChapter
}

defineProps<Props>()
</script>

<style lang="scss">
.ui-aside-chapter {
  &__label {
    padding: 0 spacing(6);
    color: var(--theme-text-placeholder);
    font-size: 12rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6rem;
  }

  &__links {
    margin-top: spacing(6);
    display: flex;
    flex-direction: column;
    gap: spacing(2);
  }
}
</style>
