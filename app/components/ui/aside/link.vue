<template>
  <div
    class="ui-aside-link"
    :data-markup-icon="link?.icon || undefined"
  >
    <ui-button
      tag="UiLink"
      :prepend-icon="link.icon || undefined"
      :link="linkAttr"
      variant="nav"
    >
      <span class="ui-aside-link__label text-clamp-1">
        {{ link.label }}
      </span>

      <template
        v-if="link.badge"
        #append
      >
        <ui-aside-badge>
          {{ useShortNumber(link.badge) }}
        </ui-aside-badge>
      </template>
    </ui-button>
  </div>
</template>

<script lang="ts" setup>
import type { SharedAsideMenuLinkItem } from '#shared/types/aside'
import type { UiLinkProps } from '~/components/ui/link/link.vue'

interface Props {
  link: SharedAsideMenuLinkItem
}

const props = defineProps<Props>()

const linkAttr = computed(() => {
  return {
    variant: 'nav',
    tag: props.link.type === 'internal' ? 'NuxtLink' : 'a',
    href: props.link.type === 'external' && typeof props.link.path === 'string' ? props.link.path : undefined,
    to: props.link.type === 'internal' && typeof props.link.path === 'object' ? props.link.path : undefined,
  } satisfies UiLinkProps
})
</script>

<style lang="scss">
.ui-aside-link {
  position: relative;

  .ui-button__prepend-icon {
    color: var(--theme-nav-text);
    font-size: 1.5em;
  }

  &:hover {
    .ui-button__prepend-icon {
      color: var(--theme-text-primary);
    }
  }

  &[data-markup-icon="jam:play"] .ui-button__prepend-icon {
    color: var(--theme-nav-jam-play)
  }

  &[data-markup-icon="jam:bar-chart"] .ui-button__prepend-icon {
    color: var(--theme-nav-jam-bar-chart)
  }

  &[data-markup-icon="jam:search"] .ui-button__prepend-icon {
    color: var(--theme-nav-jam-search)
  }
}
</style>
