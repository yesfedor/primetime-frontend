<template>
  <component
    :is="tag"
    v-bind="componentAttrs"
    class="ui-link"
  ></component>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  tag?: 'NuxtLink' | 'a'
  variant?: 'primary'
  to?: RouteLocationRaw
  href?: string
  target?: string
}

const props = withDefaults(defineProps<Props>(), {
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

  return hoisted
})
</script>

<style lang="scss">

</style>
