import type { SharedAsideMenu } from '#shared/types/aside'
import { sharedMenuAddChapters, sharedMenuAddLinkItem } from '#shared/constants/aside'

export async function useAsideMenu() {
  const quickActions = computed(() => sharedMenuAddChapters('QUICK_ACTIONS', 'Быстрые действия', [
    sharedMenuAddLinkItem('internal', 'continue_viewing', 'jam:play', 'Продолжить просмотр', { name: 'account-history' }),
    sharedMenuAddLinkItem('internal', 'statistics', 'jam:bar-chart', 'Статистика', { name: 'statistics' }),
    sharedMenuAddLinkItem('internal', 'navigator', 'jam:search', 'Навигатор', { name: 'navigator' }),
  ]))

  const navigation = computed(() => sharedMenuAddChapters('NAVIGATION', 'Навигация', [
    sharedMenuAddLinkItem('internal', 'index', 'jam:home', 'Главная', { name: 'index' }),
    sharedMenuAddLinkItem('internal', 'movies', 'jam:movie', 'Фильмы', { name: 'movies' }, 2500),
    sharedMenuAddLinkItem('internal', 'series', 'jam:screen', 'Сериалы', { name: 'series' }, 1200),
    sharedMenuAddLinkItem('internal', 'new', 'jam:calendar', 'Новинки', { name: 'new' }, 24),
    sharedMenuAddLinkItem('internal', 'popular', 'jam:flame-f', 'Популярное', { name: 'popular' }),
    sharedMenuAddLinkItem('internal', 'top', 'jam:star', 'Топ рейтинг', { name: 'top' }),
    sharedMenuAddLinkItem('internal', 'playlists', 'jam:unordered-list', 'Плейлисты', { name: 'playlist-my' }, 2),
    sharedMenuAddLinkItem('internal', 'history', 'jam:clock', 'История', { name: 'account-history' }),
    sharedMenuAddLinkItem('internal', 'favorites', 'jam:bookmark', 'Избранное', { name: 'account-favorites' }, 0),
  ]))

  const genres = computed(() => sharedMenuAddChapters('GENRES', 'Жанры', [], 'dynamic'))

  const menu = computed(() => ({
    chapters: [
      quickActions.value,
      navigation.value,
      genres.value,
    ],
  } satisfies SharedAsideMenu))

  return {
    menu,
  }
}
