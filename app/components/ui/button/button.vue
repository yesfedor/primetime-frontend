<template>
  <button
    :class="modifiers"
    class="ui-button"
  >
    <div
      v-if="prependIcon || $slots['prepend']"
      class="ui-button__prepend"
    >
      <slot name="prepend">
        <icon
          v-if="prependIcon"
          :name="prependIcon"
        />
      </slot>
    </div>
    <div class="ui-button__content">
      <slot v-if="!icon"></slot>
      <icon :name="icon"></icon>
    </div>
    <div
      v-if="appendIcon || $slots['append']"
      class="ui-button__append"
    >
      <slot name="append">
        <icon
          v-if="appendIcon"
          :name="appendIcon"
        />
      </slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  tag?: 'button' | 'UiLink'
  variant?: 'text' | 'primary' | 'secondary'
  icon?: string
  prependIcon?: string
  appendIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  icon: undefined,
})

const modifiers = computed(() => {
  return {
    '--icon': Boolean(props.icon),
    [`--variant-${props.variant}`]: true,
  }
})
</script>

<style lang="scss">
.ui-button {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  gap: 0 spacing(4);

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
}
</style>
