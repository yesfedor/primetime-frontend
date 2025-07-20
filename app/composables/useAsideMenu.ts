import type { SharedAsideMenu } from '#shared/types/aside'
import { sharedMenuAddChapters, sharedMenuAddLinkItem } from '#shared/constants/aside'

export async function useAsideMenu() {
  const quickActions = computed(() => sharedMenuAddChapters('QUICK_ACTIONS', 'Быстрые действия', [
    sharedMenuAddLinkItem('internal', 'continue_viewing', 'jam:play', 'Продолжить просмотр', { name: 'index' }),
    sharedMenuAddLinkItem('internal', 'statistics', 'jam:bar-chart', 'Статистика', { name: 'index' }),
    sharedMenuAddLinkItem('internal', 'navigator', 'jam:search', 'Навигатор', { name: 'index' }),
  ]))

  const navigation = computed(() => sharedMenuAddChapters('NAVIGATION', 'Навигация', [
    sharedMenuAddLinkItem('internal', 'index', 'jam:home', 'Главная', { name: 'index' }),
    sharedMenuAddLinkItem('internal', 'movies', 'jam:movie', 'Фильмы', { name: 'index' }, 2500),
    sharedMenuAddLinkItem('internal', 'series', 'jam:screen', 'Сериалы', { name: 'index' }, 1200),
    sharedMenuAddLinkItem('internal', 'new', 'jam:calendar', 'Новинки', { name: 'index' }, 24),
    sharedMenuAddLinkItem('internal', 'popular', 'jam:flame-f', 'Популярное', { name: 'index' }),
    sharedMenuAddLinkItem('internal', 'top-rating', 'jam:star', 'Топ рейтинг', { name: 'index' }),
    sharedMenuAddLinkItem('internal', 'playlists', 'jam:unordered-list', 'Плейлисты', { name: 'index' }, 2),
    sharedMenuAddLinkItem('internal', 'history', 'jam:clock', 'История', { name: 'index' }),
    sharedMenuAddLinkItem('internal', 'favorites', 'jam:bookmark', 'Избранное', { name: 'index' }, 0),
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
