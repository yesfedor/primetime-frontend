import type { RouteLocationRaw } from '#vue-router'

export interface SharedAsideMenuLinkItem {
  type: 'internal' | 'external'
  key: string
  icon: string
  label: string
  path: RouteLocationRaw | string
  badge?: 'string' | number
}

export interface SharedAsideMenuChapter {
  type: 'chapter' | 'dynamic'
  key: string
  label: string
  links: SharedAsideMenuLinkItem[]
}

export interface SharedAsideMenu {
  chapters: SharedAsideMenuChapter[]
}
