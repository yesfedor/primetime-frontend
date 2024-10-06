<template>
  <v-btn
    :to="{ name: 'index' }"
    :ripple="false"
    variant="text"
    class="app-logo px-0 text-body-1 text-uppercase"
  >
    {{ $t('app.logo.title') }}
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLogo',
})
</script>

<style lang="scss">
.app-logo {
  font-weight: 500;
  font-family: $font-montserrat-alt !important;
  letter-spacing: 4px !important;

  .v-btn__overlay, .v-btn__underlay, &:hover .v-btn__overlay, &:hover .v-btn__underlay {
    visibility: hidden;
    opacity: 0 !important;
  }
}
</style>
