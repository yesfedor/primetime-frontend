<template>
  <nuxt-link
    :to="{ name: 'index' }"
    :class="modifiers"
    class="ui-logo"
  >
    <div class="ui-logo__square">
      <span
        :class="{
          'nav-text': !isLarge,
          'text-h3': isLarge,
        }"
        class="ui-logo__short-name font-bold"
      >
        PT
      </span>
    </div>

    <div class="ui-logo__group">
      <span
        :class="{
          'text-h3': !isLarge,
          'modal-title': isLarge,
        }"
        class="ui-logo__name"
      >
        PrimeTime
      </span>
      <span
        :class="{
          'logo-subtitle': !isLarge,
          'text-h6': isLarge,
        }"
        class="ui-logo__postfix logo-subtitle"
      >
        Онлайн кинотеатр
      </span>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
  size?: 'default' | 'large'
  squareOnMobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  squareOnly: false,
})

const modifiers = computed(() => {
  return {
    '--square-on-mobile': props.squareOnMobile,
    [`--size-${props.size}`]: true,
  }
})

const isLarge = computed(() => props.size === 'large')
</script>

<style lang="scss">
.ui-logo {
  display: flex;
  align-items: center;
  gap: 0 spacing(6);
  user-select: none;

  &__square {
    width: 32rem;
    height: 32rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
    background: var(--btn-primary-bg);
    border-radius: 12rem;
  }

  &__group {
    display: flex;
    flex-direction: column;
  }

  &__postfix {
    margin-top: spacing(-2);
  }

  &.--square-on-mobile {
    .ui-logo__group {
      display: none;

      @include bp-tablet {
        display: flex;
      }
    }
  }
}
</style>
