<template>
  <v-navigation-drawer
    v-if="!$vuetify.display.mobile"
    :model-value="navigationDrawer.show"
    :width="navigationDrawer.width"
    :touchless="false"
    disable-resize-watcher
    disable-route-watcher
    class="border-none"
  >
    <v-list
      :lines="false"
      density="default"
      nav
    >
      <template
        v-for="(item, indexMenu) in menuItems"
      >
        <v-list-subheader
          v-if="item.subtitle && navigationDrawerWidthEnum.iconWithLabel === navigationDrawer.width"
          :key="indexMenu"
        >
          {{ item.subtitle }}
        </v-list-subheader>
        <v-list-item
          v-for="link in item.links"
          :key="`${link.to}`"
          :value="link"
          :active="isActiveItem(link.to.name)"
          :to="link.to ? link.to : undefined"
          color="primary"
          @click="link.click ? link.click : undefined"
        >
          <template
            v-if="navigationDrawerWidthEnum.iconWithLabel === navigationDrawer.width"
            #prepend
          >
            <div class="d-flex justify-center me-8">
              <v-icon
                color="primary"
                :icon="link.icon"
                class="ms-2"
              />
            </div>
          </template>
          <v-list-item-title
            color="primary"
          >
            <template v-if="navigationDrawerWidthEnum.iconWithLabel === navigationDrawer.width">
              {{ link.label }}
            </template>
            <div
              v-else
              class="d-flex justify-center"
            >
              <v-icon
                color="primary"
                :icon="link.icon"
              />
            </div>
          </v-list-item-title>
        </v-list-item>
        <v-divider
          v-if="indexMenu !== menuItems.length - 1"
          :key="indexMenu"
          class="my-5"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { navigationDrawerWidthEnum, useNavigationDrawer } from '@/composables/useNavigationDrawer'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppNavigationDrawer',
  setup() {
    const { navigationDrawer } = useNavigationDrawer()
    const { t } = useI18n()

    const route = useRoute()
    const authProvider = useAuth()

    const isActiveItem = computed(() => {
      return (name: string) => {
        return route.name === name
      }
    })

    const emptyFn = () => { /* empty */ }
    const menuItems = computed(() => {
      const menuItems = [
        {
          subtitle: '',
          links: [
            {
              icon: 'mdi-home-variant-outline',
              label: t('navigation.home'),
              to: { name: RouteNamesEnum.home },
              click: emptyFn,
            },
            {
              icon: 'mdi-fire',
              label: t('navigation.trand'),
              to: { name: RouteNamesEnum.navigatorTrand },
              click: emptyFn,
            },
            {
              icon: 'mdi-compass',
              label: t('navigation.searchFilter'),
              to: { name: RouteNamesEnum.searchFilter },
              click: emptyFn,
            },
            // {
            //   icon: 'mdi-new-box',
            //   label: t('navigation.feed'),
            //   to: { name: RouteNamesEnum.feed },
            //   click: emptyFn,
            // },
            {
              icon: 'mdi-star',
              label: t('navigation.subscription'),
              to: { name: RouteNamesEnum.subscriptions },
              click: emptyFn,
            },
          ],
        },
        {
          subtitle: '',
          links: [
            {
              icon: 'mdi-history',
              label: t('navigation.history'),
              to: { name: RouteNamesEnum.history },
              click: emptyFn,
            },
          ],
        },
      ]

      if (authProvider.user.data.access === 'author') {
        menuItems.push({
          subtitle: '',
          links: [
            {
              icon: 'mdi-shield-key',
              label: t('navigation.admin'),
              to: { name: RouteNamesEnum.adminDashboard },
              click: emptyFn,
            },
          ],
        })
      }

      return menuItems
    })

    return {
      navigationDrawerWidthEnum,
      navigationDrawer,
      menuItems,
      isActiveItem,
    }
  },
})
</script>
