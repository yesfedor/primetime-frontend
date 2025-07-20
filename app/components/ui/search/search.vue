<template>
  <form
    :class="modifiers"
    class="ui-search"
    @submit.prevent="submit"
  >
    <ui-input
      type="search"
      path="search"
      label="Поиск"
      hide-label
      @search="submit"
    />
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

interface Props {
  variant?: 'primary' | 'nav'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const modifiers = computed(() => {
  return {
    [`--variant-${props.variant}`]: true,
  }
})

const validationSchema = yup.object({
  search: yup.string(),
})

type Form = {
  search: string
}

const form = useForm<Form>({
  validationSchema,
  initialValues: {
    search: '',
  },
  keepValuesOnUnmount: false,
})

const router = useRouter()

const submit = form.handleSubmit(async (values) => {
  if (!values.search.length) {
    await router.push({ name: 'index' })
    return
  }
  await router.push({
    name: 'search',
    query: {
      query: values.search,
    },
  })
})
</script>

<style lang="scss">
.ui-search {
  width: 100%;

  &.--variant-nav {
    .ui-input {
      --border-radius: 24rem;
    }
  }
}
</style>
