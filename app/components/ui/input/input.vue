<template>
  <div
    class="ui-input"
    :class="stateClasses"
  >
    <div class="ui-input__area">
      <div
        v-if="hasPrepend"
        class="ui-input__prepend"
      >
        <slot name="prepend">
          <Icon
            v-if="isSearch"
            name="jam:search"
            :class="{
              '--mark': fieldValue.length > 2,
            }"
            class="ui-input__icon --search"
            @click.prevent.stop="emit('search')"
          />
        </slot>
      </div>

      <div class="ui-input__field-area">
        <input
          ref="inputRef"
          v-model="fieldValue"
          :type="computedInputType"
          class="ui-input__field"
          :disabled="disabled"
          :placeholder="placeholder"
          v-bind="attrs"
          @input="handleInput"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />

        <div
          v-if="hasAppendInner"
          class="ui-input__append-inner"
        >
          <slot name="appendInner">
            <Icon
              v-if="showClearIcon"
              name="jam:close"
              class="ui-input__icon ui-input__icon--clear"
              @click.prevent.stop="clearSearch"
            />
            <Icon
              v-else-if="isPassword"
              :name="passwordVisibilityIcon"
              class="ui-input__icon"
              @click.prevent.stop="togglePasswordVisibility"
            />
          </slot>
        </div>
      </div>

      <div
        v-if="hasAppend"
        class="ui-input__append"
      >
        <slot name="append" />
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="hasErrors"
        class="ui-input__errors"
      >
        <p
          v-for="(error, index) in visibleErrors"
          :key="index"
          class="ui-input__error-item"
        >
          {{ error }}
        </p>
      </div>
    </transition>

    <div
      v-if="helpText"
      class="ui-input__help"
    >
      <p class="ui-input__help-item">
        {{ helpText }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, useAttrs, useSlots } from 'vue'
import { useField } from 'vee-validate'

type InputType = 'text' | 'password' | 'search'

interface Props {
  path: string
  type?: InputType
  placeholder?: string
  disabled?: boolean
  helpText?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  helpText: '',
})

const { type, placeholder, disabled, helpText, path } = toRefs(props)

const emit = defineEmits<{
  search: []
}>()

const slots = useSlots()
const attrs = useAttrs()

// Field initialization
const {
  value: fieldValue,
  errors,
  setValue,
} = useField<string>(path, undefined)

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const showPassword = ref(false)

// Computed properties
const isSearch = computed(() => type.value === 'search')
const isPassword = computed(() => type.value === 'password')
const hasErrors = computed(() => !!errors.value?.length)
const showClearIcon = computed(() => isSearch.value && fieldValue.value?.length)
const passwordVisibilityIcon = computed(() =>
  showPassword.value ? 'jam:eye' : 'jam:eye-close',
)

const computedInputType = computed(() => {
  if (isPassword.value) return showPassword.value ? 'text' : 'password'
  return type.value
})

const visibleErrors = computed(() => {
  return errors.value?.length ? [errors.value[errors.value.length - 1]] : []
})

// Проверяем наличие контента в слотах
const hasPrepend = computed(() => !!slots.prepend || isSearch.value)
const hasAppend = computed(() => !!slots.append)
const hasAppendInner = computed(
  () => !!slots.appendInner || showClearIcon.value || isPassword.value,
)

const stateClasses = computed(() => ({
  '--focused': isFocused.value,
  '--disabled': disabled.value,
  '--with-errors': hasErrors.value,
  '--with-help-text': !!helpText.value,
}))

// Methods
const focusInput = () => {
  if (disabled.value) return
  inputRef.value?.focus()
}

const handleInput = () => {
  setValue(fieldValue.value, false)
}

const clearSearch = () => {
  setValue('', false)
  focusInput()
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
  focusInput()
}
</script>

<style lang="scss">
.ui-input {
  --input-height: 40rem;
  --vertical-padding: 0 12rem;
  --icon-size: 24rem;
  --border-radius: 16rem;

  display: flex;
  flex-direction: column;
  width: 100%;

  &__area {
    display: flex;
    align-items: center;
    min-height: var(--input-height);
    padding: var(--vertical-padding);
    background: var(--theme-card-bg);
    border: 1px solid var(--theme-border-color);
    border-radius: var(--border-radius);
    transition: border-color 0.2s;
  }

  &__prepend,
  &__append {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__prepend {
    margin-right: 8rem;
  }

  &__append {
    margin-left: 8rem;
  }

  &__field-area {
    display: flex;
    align-items: center;
    flex-grow: 1;
    position: relative;
  }

  &__field {
    width: 100%;
    padding: 0;
    color: var(--theme-text-primary);
    font-size: 16rem;
    line-height: 1.5;
    background: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: var(--theme-text-placeholder);
    }

    &::-webkit-search-cancel-button {
      display: none;
    }

    &::-ms-reveal,
    &::-ms-clear {
      visibility: hidden;
    }
  }

  &__append-inner {
    display: flex;
    align-items: center;
    margin-left: 8rem;
  }

  &__icon {
    font-size: var(--icon-size);
    color: var(--theme-text-placeholder);
    cursor: pointer;
    flex-shrink: 0;

    &--clear {
      color: var(--theme-error);
    }

    &.--search.--mark {
      color: var(--theme-text-primary);
    }
  }

  &__errors,
  &__help {
    padding-top: 4rem;
    font-size: 14rem;
    line-height: 1.5;
  }

  &__error-item {
    color: var(--theme-error);
  }

  &__help-item {
    color: var(--theme-text-secondary);
  }

  // State modifiers
  &.--focused {
    .ui-input__area {
      border-color: var(--theme-primary);
    }
  }

  &.--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &.--with-errors {
    .ui-input__area {
      border-color: var(--theme-error);
    }

    .ui-input__field {
      color: var(--theme-error);
    }
  }

  // Animation for errors
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 100ms;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
