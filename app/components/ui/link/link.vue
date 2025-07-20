<template>
  <component
    :is="tagComponent"
    v-bind="componentAttrs"
    class="ui-link"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

export interface UiLinkProps {
  tag?: 'NuxtLink' | 'a'
  variant?: 'primary' | 'nav'
  to?: RouteLocationRaw
  href?: string
  target?: string
}

const props = withDefaults(defineProps<UiLinkProps>(), {
  tag: 'NuxtLink',
  variant: 'primary',
  to: undefined,
  href: undefined,
  target: undefined,
})

const componentAttrs = computed(() => {
  const hoisted = {
    class: {
      [`--variant-${props.variant}`]: true,
    },
    target: props.target,
  }

  if (props.href) {
    hoisted.href = props.href
  }

  if (props.to) {
    hoisted.to = props.to
  }

  return hoisted
})

const tagComponent = computed(() => {
  if (props?.tag === 'NuxtLink') {
    return resolveComponent('NuxtLink')
  }
  return 'a'
})
</script>

<style lang="scss">
.ui-link {
  &.--variant-nav {
    color: var(--theme-nav-text);
    font-size: 14rem;
    font-weight: 500;

    &:hover {
      color: var(--theme-text-primary);
    }
  }
}
</style>
