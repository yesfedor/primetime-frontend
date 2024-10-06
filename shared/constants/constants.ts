import type { RouteLocationNormalized } from '#vue-router'

export const RouteNamesEnum = {
  // global
  home: 'index',

  // auth
  auth: 'auth',
  profile: 'profile',

  // navigator
  navigatorTrand: 'navigator-trand',

  // account
  feed: 'account-feed',
  history: 'account-history',
  subscriptions: 'account-subscriptions',

  // watching
  film: 'film-kpid',
  watch: 'watch-kpid',
  trailer: 'trailer-kpid',

  // staff
  staff: 'staff-staff',

  // search
  search: 'search',
  searchFilter: 'filter',

  // admin
  adminDashboard: 'admin-dashboard',
  adminViewed: 'admin-viewed',

  // errors
  error404: 'error-404',
}

export enum AppThemesEnum {
  light = 'lightTheme',
  dark = 'darkTheme',
}

export const AUTH_FROM_KEY = 'from'

export function getFailRoute(to: RouteLocationNormalized) {
  return {
    name: RouteNamesEnum.auth,
    query: {
      [AUTH_FROM_KEY]: to.fullPath,
    },
  }
}
