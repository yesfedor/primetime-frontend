<template>
  <component
    :is="tagComponent"
    :class="modifiers"
    class="ui-button"
    v-bind="tagBind"
  >
    <div
      v-if="prependIcon || $slots['prepend']"
      class="ui-button__prepend"
    >
      <slot name="prepend">
        <Icon
          v-if="prependIcon"
          :name="prependIcon"
          class="ui-button__prepend-icon"
        />
      </slot>
    </div>
    <div class="ui-button__content">
      <slot v-if="!icon"></slot>

      <Icon
        v-else
        :name="icon"
        class="ui-button__icon"
      />
    </div>
    <div
      v-if="appendIcon || $slots['append']"
      class="ui-button__append"
    >
      <slot name="append">
        <Icon
          v-if="appendIcon"
          :name="appendIcon"
          class="ui-button__append-icon"
        />
      </slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
import type { UiLinkProps } from '~/components/ui/link/link.vue'

interface Props {
  tag?: 'button' | 'UiLink'
  variant?: 'text' | 'primary' | 'secondary' | 'nav'
  icon?: string
  prependIcon?: string
  appendIcon?: string
  link?: UiLinkProps
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
  variant: 'text',
  icon: undefined,
  prependIcon: undefined,
  appendIcon: undefined,
  link: undefined,
})

const modifiers = computed(() => {
  return {
    '--icon': Boolean(props.icon),
    [`--variant-${props.variant}`]: true,
  }
})

const tagBind = computed(() => {
  if (props.tag === 'UiLink' && props.link) {
    return props.link
  }
  return null
})

const tagComponent = computed(() => {
  if (props.tag === 'UiLink') {
    return resolveComponent('UiLink')
  }
  return 'button'
})
</script>

<style lang="scss">
.ui-button {
  display: flex;
  align-items: center;
  user-select: none;
  gap: 0 spacing(4);
  transition: color, background-color linear 100ms;

  &__content {
    padding: spacing(1) 0;
    display: flex;
    align-items: center;
  }

  &__prepend {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__append {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.--variant-nav {
    padding: spacing(4) spacing(6);
    gap: 0 spacing(6);
    border-radius: 8rem;

    .ui-button__append {
      margin-left: auto;
    }

    &:hover {
      background: var(--theme-loading-bg);
    }
  }
}
</style>
