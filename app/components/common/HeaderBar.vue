<template>
  <v-app-bar
    height="32"
    color="deep-purple-accent-4"
    flat
  >
    <v-dialog max-width="500">
      <template #activator="{ props }">
        <v-app-bar-title
          class="text-body-2 text-center cursor-pointer"
          v-bind="props"
        >
          Смотрите фильмы с Кинопоиска проще! Подробнее
        </v-app-bar-title>
      </template>

      <template #default="{ isActive }">
        <v-card title="Как смотреть фильмы бесплатно?">
          <v-card-text>
            <p>Если вы нашли фильм на Кинопоиске, например:</p>

            <p class="py-3">
              <code>https://www.kinopoisk.ru/film/102151/</code>
            </p>

            <v-img src="/images/go/kp1.png" />

            <p class="mt-3">Замените в адресной строке <strong class="text-danger">"https://www."</strong> на <strong>"go"</strong>, чтобы получилось:</p>

            <p class="py-3">
              <code><strong class="text-primary">go</strong>kinopoisk.ru/film/102151/</code>
            </p>

            <v-img src="/images/go/pt1.png" />

            <p class="mt-3">Вы перейдете на PrimeTime, где сможете посмотреть этот фильм!</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text="ОК"
              @click="isActive.value = false"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeaderBar',
})
</script>
